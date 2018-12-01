import {AnyAction, AsyncActionCreators} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState, StorageState} from "../interfaces/reducers";
import {getRequest, postRequest} from "./requestsBase";
import {
    StorageAutocompleteComponentsRequest,
    CreateNewItemInStorage,
    LoadComponentsList,
    LoadStorageItems,
    LoadStorages
} from "../actions";

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

function componentListRequestForAction(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState,
    action: AsyncActionCreators<any, any, any>,
    requestString: string = "",
) {
    const url = `/component/list`;
    const requestConfig = {
        params: {
            q: requestString
        }
    };
    getRequest(dispatch, action, url, requestConfig);
}

export function componentListRequestForStorageAutocomplete(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState,
    requestString: string
) {
    componentListRequestForAction(dispatch, getState, StorageAutocompleteComponentsRequest, requestString);
    /*const url = `/component/list`;
    const requestConfig = {
        params: {
            q: requestString
        }
    };
    getRequest(dispatch, StorageAutocompleteComponentsRequest, url, requestConfig);*/
}

export function componentListRequestForComponentsPage(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    componentListRequestForAction(dispatch, getState, LoadComponentsList);
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
