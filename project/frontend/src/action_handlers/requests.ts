import {Action, AnyAction, Failure} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState, StorageState} from "../interfaces/reducers";
import {getRequest} from "../containers/requests";
import {LoadStorageItems, LoadStorages} from "../actions";
import {Storage, StorageItem} from "../interfaces/data";

export function storageItemsRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    console.log("storage items request");
    const state = getState();
    const url = `/storage/${state.storage.selectedStorageId}/items`;
    getRequest(dispatch, LoadStorageItems, url);
}

export function storageListRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    console.log("storage list request");
    const url = `/storage/list`;
    getRequest(dispatch, LoadStorages, url);
}

