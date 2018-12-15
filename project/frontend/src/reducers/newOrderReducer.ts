import {NewOrderRxState} from "../interfaces/reducers";
import {AnyAction, isType} from "typescript-fsa";
import {Logout, NewOrderStorageItemsRequest, NewOrderStoragesRequest, SetNewOrderStorage} from "../actions";
import {
    handleNewOrderStorageItemsUpdate,
    handleNewOrderStoragesUpdate, handleSetnewOrderStorage,
    logRequestFailure
} from "../action_handlers/results";

export const defaultNewOrderState: NewOrderRxState = {
    items: [],
    selectedStorageId: 0,
    storages: [],
    selectedItems: [],
};

export function newOrderReducer(state: NewOrderRxState = defaultNewOrderState, action: AnyAction): NewOrderRxState {
    if (isType(action, NewOrderStoragesRequest.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, NewOrderStoragesRequest.done)) {
        const data = action.payload.result.data;
        return handleNewOrderStoragesUpdate(state, data);
    } else if (isType(action, SetNewOrderStorage)) {
        return handleSetnewOrderStorage(state, action.payload.storageId);
    } else if (isType(action, NewOrderStorageItemsRequest.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, NewOrderStorageItemsRequest.done)) {
        const items = action.payload.result.data;
        return handleNewOrderStorageItemsUpdate(state, items);
    } else if (isType(action, Logout)) {
        return defaultNewOrderState
    }
    return state;
}