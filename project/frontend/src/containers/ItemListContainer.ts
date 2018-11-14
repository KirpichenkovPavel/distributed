import {AnyAction} from "redux";
import {ItemListContainerProps} from "../interfaces/containers";
import {connect} from "react-redux";
import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import ItemList from "../components/ItemtList";
import {ItemListCallbacks, ItemListProps} from "../interfaces/components";

const mapStateToProps = (store: ApplicationState, props: ItemListContainerProps): ItemListProps => {
    return {
        items: store.storage.storageItems
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    props: ItemListProps
): ItemListCallbacks => {
    return {
    }
};

const ItemListContainer = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export default ItemListContainer;