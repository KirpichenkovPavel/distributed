import {ApplicationState} from "../interfaces/reducers";
import {RootContainerProps} from "../interfaces/containers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import Root from "../components/Root";
import {storageItemsRequest} from "../action_handlers/requests";
import {RootCallbacks, RootProps} from "../interfaces/components";

const mapStateToProps = (store: ApplicationState, props: RootContainerProps): RootProps => {
    return {
        storageId: store.storage.selectedStorageId,
        fullStateForDebug: store
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    props: RootProps
): RootCallbacks => {
    return {
        onUpdate: () => dispatch(storageItemsRequest)
    }
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;