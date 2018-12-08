import {AnyAction, AsyncActionCreators} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState, StorageState} from "../interfaces/reducers";
import {getRequest, postRequest} from "./requestsBase";
import {
    StorageAutocompleteComponentsRequest,
    CreateNewItemInStorage,
    LoadComponentsList,
    LoadStorageItems,
    LoadStorages, CreateNewComponent, UserModalConfirmRequest
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
}

export function componentListRequestForComponentsPage(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    componentListRequestForAction(dispatch, getState, LoadComponentsList);
}

export function createNewItemInStorageRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const state = getState();
    const id = state.storage.selectedStorageId;
    const newItem = [state.storage.newItem];
    const url = `/storage/${id}/items/add`;
    postRequest(dispatch, CreateNewItemInStorage, url, newItem, {}, {}, storageItemsRequest);
}

export function createNewComponentRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const state = getState();
    const newComponent = {
        name: state.componentList.newComponent.name.trim(),
        description: state.componentList.newComponent.description.trim()
    };
    const url = '/component';
    postRequest(dispatch, CreateNewComponent, url, newComponent, {}, {}, componentListRequestForComponentsPage);
}

export function loginRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const state = getState();
    const {nameInput, signInActive, registerActive} = state.user.login;
    let url;
    if (signInActive) {
        url = `/user/roles`;
        const requestConfig = {
            params: {
                name: nameInput
            }
        };
        getRequest(dispatch,
            UserModalConfirmRequest,
            url,
            requestConfig,
            {},
            {name: nameInput});
    } else if (registerActive) {
        url = `/user/add`;
        const body = {
            name: nameInput
        };
        postRequest(dispatch, UserModalConfirmRequest, url, body);
    } else {
        return;
    }

}