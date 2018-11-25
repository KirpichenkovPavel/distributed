import {ApplicationState} from "../interfaces/reducers";
import {RootContainerProps} from "../interfaces/containers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import Root from "../components/Root";
import {storageItemsRequest} from "../action_handlers/requests";
import {RootCallbacks, RootProps} from "../interfaces/components";
import {Page} from "../interfaces/data";
import {ChangePage} from "../actions";

const mapStateToProps = (store: ApplicationState, props: RootContainerProps): RootProps => {
    return {
        storageId: store.storage.selectedStorageId,
        fullStateForDebug: store,
        activeRoles: store.user.roles,
        currentPage: store.user.activePage
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    props: RootProps
): RootCallbacks => {
    return {
        // onUpdate: () => dispatch(storageItemsRequest),
        onNextPage: (next: Page) => dispatch(ChangePage({next: next})),
    }
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;