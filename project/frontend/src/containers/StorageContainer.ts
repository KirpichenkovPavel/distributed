import {AnyAction} from "redux";
import {connect} from "react-redux";
import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import ItemList from "../components/ItemList";
import {ItemListCallbacks, ItemListProps} from "../interfaces/components";
import {SetStorage, UpdateNewStorageItem} from "../actions";
import {
    componentListRequestForStorageAutocomplete,
    createNewItemInStorage,
    storageItemsRequest,
    storageListRequest
} from "../action_handlers/requests";

const mapStateToProps = (store: ApplicationState, containerProps: {}): ItemListProps => {
    return {
        storage: store.storage
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    containerProps: {}
): ItemListCallbacks => {
    return {
        onMount: () => dispatch(storageListRequest),
        onStoragePick: (storageId: number) => {
            dispatch(SetStorage({id: storageId}));
            dispatch(storageItemsRequest);
        },
        onAddItem: () => dispatch(createNewItemInStorage),
        onSetItemAmount: (amount: number) => dispatch(UpdateNewStorageItem({amount: amount})),
        onSetItemPrice: (price: number) => dispatch(UpdateNewStorageItem({price: price})),
        onSelectComponent: (name: string) => dispatch(UpdateNewStorageItem({name: name})),
        onComponentSearch: (text: string) => dispatch((d, s) => componentListRequestForStorageAutocomplete(d, s, text))
    }
};

const StorageContainer = connect(mapStateToProps, mapDispatchToProps)(ItemList);
export default StorageContainer;