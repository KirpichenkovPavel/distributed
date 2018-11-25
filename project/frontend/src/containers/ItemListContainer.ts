import {AnyAction} from "redux";
import {ItemListContainerProps} from "../interfaces/containers";
import {connect} from "react-redux";
import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import ItemList from "../components/ItemtList";
import {ItemListCallbacks, ItemListProps} from "../interfaces/components";
import {LoadStorages, SetStorage} from "../actions";
import {storageItemsRequest, storageListRequest} from "../action_handlers/requests";

const mapStateToProps = (store: ApplicationState, props: ItemListContainerProps): ItemListProps => {
    return {
        storage: store.storage
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    props: ItemListProps
): ItemListCallbacks => {
    return {
        onMount: () => dispatch(storageListRequest),
        onStoragePick: (storageId: number) => {
            dispatch(SetStorage({id: storageId}));
            dispatch(storageItemsRequest);
        }
    }
};

const ItemListContainer = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export default ItemListContainer;