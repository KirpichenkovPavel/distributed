import {ApplicationState} from "../interfaces/reducers";
import {OrderDetailCallbacks, OrderDetailProps} from "../interfaces/components";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import OrderDetail from "../components/OrderDetail";
import {orderDetailRequest, processOrderRequest} from "../action_handlers/requests";
import {creatorProceedStatuses, executorProceedStatuses} from "../constants";

function mapStateToProps(state: ApplicationState): OrderDetailProps {
    const {id, from, to, items, payment, status, created, storage, loaded} = state.orderDetail;
    const user = state.user.userName;
    const proceedAllowed =
        user === from && creatorProceedStatuses.find(s => s === status)
        || (to === null && user !== from || user === to) && executorProceedStatuses.find(s => s === status);
    return {
        id: id,
        from: from,
        to: to,
        items: items,
        created: created,
        status: status,
        payment: payment,
        storage: storage,
        loaded: loaded,
        showProceedButton: Boolean(proceedAllowed),
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): OrderDetailCallbacks {
    return {
        loadDetail: () => dispatch(orderDetailRequest),
        process: () => dispatch(processOrderRequest),
        cancel: () => console.log("cancel"),
    }
}

const OrderDetailContainer = connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
export default OrderDetailContainer;