import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import Root from "../components/Root";
import {RootCallbacks, RootProps} from "../interfaces/components";
import {Page} from "../interfaces/data";
import {ChangePage} from "../actions";

const mapStateToProps = (store: ApplicationState, containerProps: {}): RootProps => {
    return {
        storageId: store.storage.selectedStorageId,
        fullStateForDebug: store,
        activeRoles: store.user.roles,
        currentPage: store.user.activePage
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    containerProps: {}
): RootCallbacks => {
    return {
        onNextPage: (next: Page) => dispatch(ChangePage({next: next})),
    }
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;