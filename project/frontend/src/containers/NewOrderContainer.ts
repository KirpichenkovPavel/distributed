import {NewOrderCallbacks, NewOrderProps} from "../interfaces/components";
import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import NewOrder from "../components/NewOrder";
import {orderStorageItemsRequest, orderStorageListRequest} from "../action_handlers/requests";
import {SetNewOrderStorage} from "../actions";

function mapStateToProps(state: ApplicationState): NewOrderProps{
    return {
        storages: state.newOrder.storages,
        selectedStorageId: state.newOrder.selectedStorageId,
        availableItems: state.newOrder.items,
        selectedItems: state.newOrder.selectedItems,
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): NewOrderCallbacks {
    return {
        onMount: () => dispatch(orderStorageListRequest),
        onSelectStorage: (storageId: number) => {
            dispatch(SetNewOrderStorage({storageId: storageId}));
            dispatch(orderStorageItemsRequest);
        },
    }
}

const NewOrderContainer = connect(mapStateToProps, mapDispatchToProps)(NewOrder);
export default NewOrderContainer;
