import {ApplicationState} from "../interfaces/reducers";
import {OrderDetailCallbacks, OrderDetailProps} from "../interfaces/components";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import OrderDetail from "../components/OrderDetail";
import {orderDetailRequest} from "../action_handlers/requests";

function mapStateToProps(state: ApplicationState): OrderDetailProps {
    const {id, from, to, items, payment, status, created, storage} = state.orderDetail;
    return {
        id: id,
        from: from,
        to: to,
        items: items,
        created: created,
        status: status,
        payment: payment,
        storage: storage,
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): OrderDetailCallbacks {
    return {
        loadDetail: () => dispatch(orderDetailRequest),
    }
}

const OrderDetailContainer = connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
export default OrderDetailContainer;