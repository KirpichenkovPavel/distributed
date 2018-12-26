import {AnyAction} from "redux";
import {OrderDetailRxState} from "../interfaces/reducers";
import {isType} from "typescript-fsa";
import {GoToOrderDetail, OrderDetailRequest} from "../actions";
import {handleGoToDetailInfo, handleOrderDetailRequest, logRequestFailure} from "../action_handlers/results";
import {DetailedOrder} from "../interfaces/data";


export const defaultOrderDetail: OrderDetailRxState = {
    id: 0,
    created: "",
    from: "",
    items: [],
    payment: null,
    status: "",
    storage: {
        id: 0,
        name: "",
    },
    to: "",
    loaded: false
};

export function orderDetailReducer(state: OrderDetailRxState = defaultOrderDetail, action: AnyAction): OrderDetailRxState {
    if (isType(action, OrderDetailRequest.failed)) {
        logRequestFailure(state, action);
        return Object.assign({}, state, {loaded: true});
    } else if (isType(action, OrderDetailRequest.done)) {
        const order: DetailedOrder = action.payload.result.data;
        return handleOrderDetailRequest(state, order);
    } else if (isType(action, OrderDetailRequest.started)) {
        return Object.assign({}, state, {loaded: false});
    } else if (isType(action, GoToOrderDetail)) {
        return handleGoToDetailInfo(state, action.payload.orderId);
    }
    return state;
}