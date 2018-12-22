import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import Root from "../components/Root";
import {RootCallbacks, RootProps} from "../interfaces/components";
import {Page} from "../interfaces/data";
import {ChangePage, ChangeUserNameInput, CloseLoginModal, Logout, OpenLoginModal} from "../actions";
import {loginRequest} from "../action_handlers/requests";

const mapStateToProps = (store: ApplicationState): RootProps => {
    return {
        storageId: store.storage.selectedStorageId,
        fullStateForDebug: store,
        activeRoles: store.user.roles,
        currentPage: store.user.activePage,
        loginInfo: store.user.login,
        activeUser: store.user.userName
    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
): RootCallbacks => {
    return {
        onNextPage: (next: Page) => dispatch(ChangePage({next: next})),
        onModalClose: () => dispatch(CloseLoginModal()),
        onModalConfirm: () => dispatch(loginRequest),
        onModalInputChange: (newText: string) => dispatch(ChangeUserNameInput({newText: newText})),
        onModalOpen: (signIn: boolean) => dispatch(OpenLoginModal({signIn: signIn})),
        onLogout: () => dispatch(Logout()),
    }
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;