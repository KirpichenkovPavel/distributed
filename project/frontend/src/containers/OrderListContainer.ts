import {ApplicationState} from "../interfaces/reducers";
import {OrderListCallbacks, OrderListProps} from "../interfaces/components";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import OrderList from "../components/OrderList";
import {createdOrdersRequest} from "../action_handlers/requests";
import {ChangeMyOrdersPage, ChangeMyOrdersTableFilter, GoToOrderDetail} from "../actions";

function mapStateToProps(state: ApplicationState): OrderListProps {
    return {
        orders: state.createdOrders.orders,
        page: state.createdOrders.page,
        last: state.createdOrders.last,
        status: state.createdOrders.statusFilter,
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): OrderListCallbacks {
    return {
        fetchOrders: () => dispatch(createdOrdersRequest),
        changePage: (page: number) => {
            dispatch(ChangeMyOrdersPage({page: page}));
            dispatch(createdOrdersRequest);
        },
        changeStatusFilter: status => {
            dispatch(ChangeMyOrdersTableFilter({status: status}));
            dispatch(ChangeMyOrdersPage({page: 0}));
            dispatch(createdOrdersRequest);
        },
        toOrderDetail: id => dispatch(GoToOrderDetail({orderId: id})),
    }
}

const OrderListContainer = connect(mapStateToProps, mapDispatchToProps)(OrderList);
export default OrderListContainer;
