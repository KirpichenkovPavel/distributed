import {ApplicationState} from "../interfaces/reducers";
import {combineReducers} from "redux";
import {defaultStorage, storageReducer} from "./storageReducer";
import {defaultUserInfo, userReducer} from "./userReducer";

export const initialState: ApplicationState = {
    storage: defaultStorage,
    user: defaultUserInfo
};

export const combinedReducer = combineReducers({
    storage: storageReducer,
    user: userReducer
});
