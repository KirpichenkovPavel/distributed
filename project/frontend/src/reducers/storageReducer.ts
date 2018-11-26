import {LoadStorageItems, LoadStorages, SetStorage} from "../actions";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {StorageState} from "../interfaces/reducers";
import {handleStorageItemsUpdate, handleStoragesUpdate, logRequestFailure} from "../action_handlers/results";

export const defaultStorage: StorageState = {
    selectedStorageId: 0,
    storageItems: [],
    allStorages: [],
    newItem: {
        name: "",
        amount: 0,
        price: 0,
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
    }
    else {
        return state;
    }
}

