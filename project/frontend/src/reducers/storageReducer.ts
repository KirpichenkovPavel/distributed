import {
    StorageAutocompleteComponentsRequest,
    LoadStorageItems,
    LoadStorages,
    SetStorage,
    UpdateNewStorageItem,
    Logout
} from "../actions";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {StorageState} from "../interfaces/reducers";
import {handleStorageItemsUpdate, handleStoragesUpdate, logRequestFailure} from "../action_handlers/results";
import {updateNewStorageItem} from "../action_handlers/provider";

export const defaultStorage: StorageState = {
    selectedStorageId: 0,
    storageItems: [],
    allStorages: [],
    newItem: {
        name: "",
        amount: 0,
        price: 0,
    },
    componentAutocomplete: {
        options: [],
        page: 1
    }
};

export function storageReducer(state: StorageState = defaultStorage, action: Action): StorageState {
    if (isType(action, LoadStorageItems.done)) {
        const data = action.payload.result;
        return handleStorageItemsUpdate(state, data.data);
    } else if (isType(action, LoadStorageItems.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, LoadStorages.done)) {
        const data = action.payload.result;
        return handleStoragesUpdate(state, data.data)
    } else if (isType(action, LoadStorages.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, SetStorage)) {
        const id = action.payload.id;
        console.log(id);
        return Object.assign({}, state, {selectedStorageId: id});
    } else if (isType(action, UpdateNewStorageItem)) {
        const {name, amount, price} = action.payload;
        return updateNewStorageItem(state, name, amount, price);
    } else if (isType(action, StorageAutocompleteComponentsRequest.done)) {
        const names = action.payload.result.data.data.map(component => component.name || '');
        return Object.assign({}, state, {
            componentAutocomplete: {
                options: names,
                page: 1
            }
        });
    } else if (isType(action, StorageAutocompleteComponentsRequest.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, Logout)) {
        return defaultStorage
    }
    else {
        return state;
    }
}

