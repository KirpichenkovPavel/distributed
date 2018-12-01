import {ApplicationState} from "../interfaces/reducers";
import {combineReducers} from "redux";
import {defaultStorage, storageReducer} from "./storageReducer";
import {defaultUserInfo, userReducer} from "./userReducer";
import {componentListReducer, defaultComponentList} from "./componentListReducer";

export const initialState: ApplicationState = {
    storage: defaultStorage,
    user: defaultUserInfo,
    componentList: defaultComponentList
};

export const combinedReducer = combineReducers({
    storage: storageReducer,
    user: userReducer,
    componentList: componentListReducer
});
