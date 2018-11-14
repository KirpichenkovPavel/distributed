import {ApplicationState} from "../interfaces/reducers";
import {combineReducers} from "redux";

export const initialState: ApplicationState = {
    selectedStorageId: 1
};

function mainReducer(state: ApplicationState, action): ApplicationState {
    return state;
}

const combinedReducer = combineReducers({
    mainReducer
});

export default mainReducer;