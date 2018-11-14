import {ApplicationState} from "../interfaces/reducers";
import {Action, combineReducers} from "redux";
import {defaultStorage, storageReducer} from "./storageReducer";

export const initialState: ApplicationState = {
    storage: defaultStorage
};

export const combinedReducer = combineReducers({
    storage: storageReducer
});
