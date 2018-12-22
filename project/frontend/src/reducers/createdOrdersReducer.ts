import {CreatedOrdersRxState} from "../interfaces/reducers";
import {AnyAction} from "redux";
import {isType} from "typescript-fsa";
import {ChangeMyOrdersPage, Logout, MyOrdersListRequest} from "../actions";
import {handleChangeMyOrdersPage, handleMyOrdersRequestResults, logRequestFailure} from "../action_handlers/results";

export const defaultCreatedOrdersState: CreatedOrdersRxState = {
    last: 0,
    page: 0,
    orders: [],
    statusFilter: "",
};

export function createdOrdersReducer(
    state: CreatedOrdersRxState = defaultCreatedOrdersState,
    action: AnyAction): CreatedOrdersRxState
{
    if (isType(action, MyOrdersListRequest.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, MyOrdersListRequest.done)) {
        const {orders, page, last} = action.payload.result.data;
        return handleMyOrdersRequestResults(state, orders, page, last);
    } else if (isType(action, ChangeMyOrdersPage)) {
        return handleChangeMyOrdersPage(state, action.payload.page);
    } else if (isType(action, Logout)) {
        return defaultCreatedOrdersState;
    }
    return state;
}