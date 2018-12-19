import {ApplicationState} from "../interfaces/reducers";
import {OrderListCallbacks, OrderListProps} from "../interfaces/components";
import {AnyAction} from "redux";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import OrderList from "../components/OrderList";

function mapStateToProps(state: ApplicationState): OrderListProps {
    return {

    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): OrderListCallbacks {
    return {

    }
}

const OrderListContainer = connect(mapStateToProps, mapDispatchToProps)(OrderList);
export default OrderListContainer;
