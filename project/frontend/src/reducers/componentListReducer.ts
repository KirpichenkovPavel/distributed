import {ComponentListState} from "../interfaces/reducers";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {LoadComponentsList} from "../actions";
import {handleComponentListLoaded, logRequestFailure} from "../action_handlers/results";

export const defaultComponentList: ComponentListState = {
    components: []
};

export function componentListReducer(state: ComponentListState = defaultComponentList,
                                     action: Action): ComponentListState {
    if (isType(action, LoadComponentsList.done)) {
        return handleComponentListLoaded(state, action.payload.result.data);
    } else if (isType(action, LoadComponentsList.failed)) {
        return logRequestFailure(state, action);
    }
    else {
        return state;
    }
}
