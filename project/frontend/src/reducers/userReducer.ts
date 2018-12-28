import {UserInfo} from "../interfaces/reducers";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {
    ChangePage,
    ChangeUserNameInput,
    CloseLoginModal, GoToOrderDetail,
    Logout,
    OpenLoginModal, SaveNewOrder,
    UserModalConfirmRequest
} from "../actions";
import {
    handleGoToDetailPage,
    handleLoginModalClose,
    handleLoginModalInputTextChange,
    handleLoginModalOpen, handleLoginResults, handleLogout,
    logRequestFailure
} from "../action_handlers/results";

export const defaultUserInfo: UserInfo = {
    roles: [],
    activePage: "none",
    userName: null,
    login: {
        nameInput: "",
        registerActive: false,
        signInActive: false,
    }
};

export function userReducer(state: UserInfo = defaultUserInfo, action: Action): UserInfo {
    if (isType(action, ChangePage)) {
        const nextPage = action.payload.next;
        return Object.assign({}, state, {activePage: nextPage});
    } else if (isType(action, OpenLoginModal)) {
        const signIn = action.payload.signIn;
        return handleLoginModalOpen(state, signIn);
    } else if (isType(action, CloseLoginModal)) {
        return handleLoginModalClose(state)
    } else if (isType(action, ChangeUserNameInput)) {
        const newText = action.payload.newText;
        return handleLoginModalInputTextChange(state, newText);
    } else if (isType(action, UserModalConfirmRequest.done)) {
        const result = action.payload.result;
        return handleLoginResults(state, result, action.payload.params.name);
    } else if (isType(action, UserModalConfirmRequest.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, Logout)) {
        return handleLogout(state);
    } else if (isType(action, GoToOrderDetail)) {
        return handleGoToDetailPage(state);
    } else if (isType(action, SaveNewOrder.done)) {
        return Object.assign({}, state, {activePage: 'orderDetail'});
    }
    return state
}