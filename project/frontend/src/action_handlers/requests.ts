import {AnyAction, AsyncActionCreators} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState, StorageState} from "../interfaces/reducers";
import {getRequest, postRequest} from "./requestsBase";
import {
    StorageAutocompleteComponentsRequest,
    CreateNewItemInStorage,
    LoadComponentsList,
    LoadStorageItems,
    LoadStorages,
    CreateNewComponent,
    UserModalConfirmRequest,
    NewOrderStoragesRequest,
    NewOrderStorageItemsRequest,
    SaveNewOrder, ResetNewOrder, MyOrdersListRequest, OrderDetailRequest
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
    const userName = getState().user.userName;
    const config = {
        params: {
            userName: userName
        }
    };
    getRequest(dispatch, LoadStorages, url, config);
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
            q: requestString,
            page: getState().componentList.page
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
    getState: () => ApplicationState,
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

export function orderStorageListRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const url = `/storage/list/role`;
    const userName = getState().user.userName;
    const roleName = getState().user.activePage === "newManagerOrder" ? "manager" : "client";
    const config = {
        params: {
            userName: userName,
            roleName: roleName
        }
    };
    getRequest(dispatch, NewOrderStoragesRequest, url, config);
}

export function orderStorageItemsRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const state = getState();
    const url = `/storage/${state.newOrder.selectedStorageId}/items`;
    getRequest(dispatch, NewOrderStorageItemsRequest, url);
}

export function saveNewOrder(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState,
) {
    const state = getState();
    const url = `/order/new`;
    const data = {
        userName: state.user.userName,
        storageId: state.newOrder.selectedStorageId,
        items: state.newOrder.selectedItems
            .filter(it => it.amount > 0)
            .map(it => ({
                    name: it.name,
                    amount: it.amount,
                    price: it.price
                })
            ),
    };
    postRequest(dispatch, SaveNewOrder, url, data, {}, {},
            dispatch => dispatch(ResetNewOrder()));
}

export function createdOrdersRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState,
) {
    const state = getState();
    const user = state.user.userName;
    const page = state.createdOrders.page;
    const url = `/order/list/my`;
    const config = {
        params: {
            userName: user,
            status: state.createdOrders.statusFilter,
            page: page,
        }
    };
    getRequest(dispatch, MyOrdersListRequest, url, config);
}

export function orderDetailRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState,
) {
    const state = getState();
    const id = state.orderDetail.id;
    const url = `/order/detail/${id}`;
    const config = {
        params: {
            userName: state.user.userName
        }
    };
    getRequest(dispatch, OrderDetailRequest, url, config);
}