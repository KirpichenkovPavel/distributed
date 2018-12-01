import {AnyAction} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState, StorageState} from "../interfaces/reducers";
import {getRequest, postRequest} from "./requestsBase";
import {ComponentsRequest, CreateNewItemInStorage, LoadStorageItems, LoadStorages} from "../actions";

export function storageItemsRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const state = getState();
    const url = `/storage/${state.storage.selectedStorageId}/items`;
    getRequest(dispatch, LoadStorageItems, url);
}

export function storageListRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const url = `/storage/list`;
    getRequest(dispatch, LoadStorages, url);
}

export function componentListRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState,
    requestString: string
) {
    const url = `/component/list`;
    const requestConfig = {
        params: {
            q: requestString
        }
    };
    getRequest(dispatch, ComponentsRequest, url, requestConfig);
}

export function createNewItemInStorage(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const state = getState();
    const id = state.storage.selectedStorageId;
    const newComponent = [state.storage.newItem];
    const url = `/storage/${id}/items/add`;
    postRequest(dispatch, CreateNewItemInStorage, url, newComponent, {}, {}, storageItemsRequest);
}