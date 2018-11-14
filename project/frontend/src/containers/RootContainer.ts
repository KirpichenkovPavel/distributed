import {ApplicationState} from "../interfaces/reducers";
import {RootCallbacks, RootContainerProps, RootProps} from "../interfaces/containers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import Root from "../components/Root";
import {LoadStorageItems} from "../actions";
import {storageItemsRequest} from "../action_handlers/requests";

const mapStateToProps = (store: ApplicationState, props: RootContainerProps): RootProps => {
    return {
        storageId: store.selectedStorageId
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    props: RootProps
): RootCallbacks => {
    return {
        onMount: () => dispatch(storageItemsRequest)
    }
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;