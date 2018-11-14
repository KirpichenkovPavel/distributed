import {AnyAction} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState, Storage} from "../interfaces/reducers";
import {getRequest} from "../containers/requests";
import {LoadStorageItems} from "../actions";
import {StorageItem} from "../interfaces/data";

export function storageItemsRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    console.log("storage items request");
    const state = getState();
    const url = `/storage/${state.storage.selectedStorageId}/items`;
    getRequest(dispatch, LoadStorageItems, url);
}

export function handleStorageItemsUpdate(state: Storage, newItems: Array<StorageItem>): Storage {
    return Object.assign({}, state, {storageItems: newItems});
}