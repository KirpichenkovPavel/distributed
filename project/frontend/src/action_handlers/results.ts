import {Action, Failure} from "typescript-fsa";
import {StorageState} from "../interfaces/reducers";
import {Storage, StorageItem} from "../interfaces/data";

export function logRequestFailure(state, action: Action<Failure<{}, {data: any}>>) {
    const error = action.payload.error;
    console.error(error);
    return state;
}

export function handleStoragesUpdate(state: StorageState, storages: Array<Storage>): StorageState {
    return Object.assign({}, state, {allStorages: storages});
}

export function handleStorageItemsUpdate(state: StorageState, newItems: Array<StorageItem>): StorageState {
    return Object.assign({}, state, {storageItems: newItems});
}