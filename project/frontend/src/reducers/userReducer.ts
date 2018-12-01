import {UserInfo} from "../interfaces/reducers";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {ChangePage} from "../actions";

export const defaultUserInfo: UserInfo = {
    roles: ["provider", "client", "manager"],
    activePage: "none"
};

export function userReducer(state: UserInfo = defaultUserInfo, action: Action): UserInfo {
    if (isType(action, ChangePage)) {
        const nextPage = action.payload.next;
        return Object.assign({}, state, {activePage: nextPage});
    }
    return state
}