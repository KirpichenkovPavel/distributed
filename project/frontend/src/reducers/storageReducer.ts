import {LoadStorageItems} from "../actions";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {Storage} from "../interfaces/reducers";
import {handleStorageItemsUpdate} from "../action_handlers/requests";

export const defaultStorage: Storage = {
    selectedStorageId: 1,
    storageItems: []
};

export function storageReducer(state: Storage = defaultStorage, action: Action): Storage {
    if (isType(action, LoadStorageItems.started)) {
        return state;
    } else if (isType(action, LoadStorageItems.done)) {
        const data = action.payload.result;
        return handleStorageItemsUpdate(state, data.data);
    } else if (isType(action, LoadStorageItems.failed)) {
        const error = action.payload.error;
        return state;
    } else {
        return state;
    }
}

