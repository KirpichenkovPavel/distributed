import actionCreatorFactory, {AsyncActionCreators} from 'typescript-fsa';
import {Component, Page, PaginatedComponentList, StorageItem} from "./interfaces/data";

const actionCreator = actionCreatorFactory();

function asyncAction(name: string): AsyncActionCreators<any, any, any> {
    return actionCreator.async<any, any, any>(name);
}

export const LoadStorageItems = asyncAction('LOAD_STORAGE_ITEMS');
export const ChangePage = actionCreator<{next: Page}>('CHANGE_PAGE');
export const LoadStorages = asyncAction('LOAD_STORAGES');
export const SetStorage = actionCreator<{id: number}>('SET_STORAGE');
export const UpdateNewStorageItem = actionCreator<{name?: string, amount?: number, price?: number}>('UPDATE_NEW_STORAGE_ITEM');
export const StorageAutocompleteComponentsRequest = asyncAction('COMPONENTS_REQUEST');
export const CreateNewItemInStorage = asyncAction('CREATE_NEW_ITEM');
export const LoadComponentsList = asyncAction("LOAD_COMPONENTS_LIST");
export const ChangeComponentListPage = actionCreator<{page: number}>("CHANGE_COMPONENT_LIST_PAGE");
export const UpdateNewComponent = actionCreator<{name?: string, description?: string}>("UPDATE_NEW_COMPONENT");
export const CreateNewComponent = asyncAction('CREATE_NEW_COMPONENT');
export const OpenLoginModal = actionCreator<{signIn: boolean}>("OPEN_LOGIN_MODAL");
export const CloseLoginModal = actionCreator("CLOSE_LOGIN_MODAL");
export const ChangeUserNameInput = actionCreator<{newText: string}>("CHANGE_USER_NAME_INPUT");
export const UserModalConfirmRequest = asyncAction("LOGIN_REQUEST");
export const Logout = actionCreator("LOGOUT");
export const NewOrderStoragesRequest = asyncAction("NEW_ORDER_STORAGES");
export const SetNewOrderStorage = actionCreator<{storageId: number}>("SET_NEW_ORDER_STORAGE");
export const NewOrderStorageItemsRequest = asyncAction("NEW_ORDER_STORAGE_ITEMS");
export const ChangeNewOrderItemSelection = actionCreator<{name: string, amount: number, inSelected: boolean}>("CHANGE_NEW_ORDER_ITEM_SELECTION");
export const AddItemToNewOrderSelection = actionCreator<{name: string}>("ADD_ITEM_TO_NEW_ORDER_SELECTION");
export const SaveNewOrder = asyncAction("SAVE_NEW_ORDER");
export const ResetNewOrder = actionCreator("RESET_NEW_ORDER");
export const MyOrdersListRequest = asyncAction("MY_ORDERS_LIST_REQUEST");
export const ChangeMyOrdersPage = actionCreator<{page: number}>("CHANGE_MY_ORDERS_PAGE");
export const ChangeMyOrdersTableFilter = actionCreator<{status: string}>("CHANGE_MY_ORDERS_TABLE_FILTER");
export const GoToOrderDetail = actionCreator<{orderId: number}>("GO_TO_ORDER_DETAIL");
export const OrderDetailRequest = asyncAction("ORDER_DETAIL_REQUEST");
export const OrderProcessRequest = asyncAction("ORDER_PROCESS_REQUEST");
