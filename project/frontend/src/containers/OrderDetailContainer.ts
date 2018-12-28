import {ApplicationState} from "../interfaces/reducers";
import {OrderDetailCallbacks, OrderDetailProps} from "../interfaces/components";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import OrderDetail from "../components/OrderDetail";
import {
    cancelOrderRequest,
    makePayment,
    orderDetailRequest,
    processOrderRequest,
    storageListRequest
} from "../action_handlers/requests";
import {
    creatorCancelStatuses,
    creatorProceedStatuses,
    executorCancelStatuses,
    executorProceedStatuses
} from "../constants";
import {SelectTargetStorage} from "../actions";

function mapStateToProps(state: ApplicationState): OrderDetailProps {
    const {id, from, to, items, payment, status, created, storage, loaded} = state.orderDetail;
    const user = state.user.userName;
    const proceedAllowed =
        user === from && creatorProceedStatuses.find(s => s === status)
        || (to === null && user !== from || user === to) && executorProceedStatuses.find(s => s === status);
    const cancelAllowed =
        user === from && creatorCancelStatuses.find(s => s === status)
        || (to === null && user !== from || user === to) && executorCancelStatuses.find(s => s === status);
    const paymentAllowed = user === from && status === "approved";
    const showStorageSelector = state.storage.allStorages.length > 0 && status == 'complete' && from === user;
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
        showCancelButton: Boolean(cancelAllowed),
        showPaymentButton: Boolean(paymentAllowed),
        ownedStorages: state.storage.allStorages || [],
        selectedTargetStorage: state.orderDetail.selectedTargetStorage,
        showStorageSelector: showStorageSelector,
    };
}

function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): OrderDetailCallbacks {
    return {
        loadDetail: () => {
            dispatch(orderDetailRequest);
            dispatch(storageListRequest);
        },
        process: () => dispatch(processOrderRequest),
        cancel: () => dispatch(cancelOrderRequest),
        purchase: () => dispatch(makePayment),
        selectTargetStorage: id => dispatch(SelectTargetStorage({id: id})),
    }
}

const OrderDetailContainer = connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
export default OrderDetailContainer;