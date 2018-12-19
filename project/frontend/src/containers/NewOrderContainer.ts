import {NewOrderCallbacks, NewOrderProps} from "../interfaces/components";
import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import NewOrder from "../components/NewOrder";
import {orderStorageItemsRequest, orderStorageListRequest} from "../action_handlers/requests";
import {AddItemToNewOrderSelection, ChangeNewOrderItemSelection, SetNewOrderStorage} from "../actions";

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
        onChangeItemSelection: (name: string, newAmount: number, inSelected: boolean) =>
            dispatch(ChangeNewOrderItemSelection({name: name, amount: newAmount, inSelected: inSelected})),
        onAddToSelected: (name: string) => dispatch(AddItemToNewOrderSelection({name: name})),
    }
}

const NewOrderContainer = connect(mapStateToProps, mapDispatchToProps)(NewOrder);
export default NewOrderContainer;
