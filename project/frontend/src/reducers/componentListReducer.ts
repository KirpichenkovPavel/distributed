import {ComponentListRxState} from "../interfaces/reducers";
import {Action} from "redux";
import {isType} from "typescript-fsa";
import {CreateNewComponent, LoadComponentsList, UpdateNewComponent} from "../actions";
import {handleComponentListLoaded, logRequestFailure} from "../action_handlers/results";
import {updateNewComponent} from "../action_handlers/provider";

export const defaultComponentList: ComponentListRxState = {
    components: [],
    newComponent: {
        name: "",
        description: ""
    }
};

export function componentListReducer(state: ComponentListRxState = defaultComponentList,
                                     action: Action): ComponentListRxState {
    if (isType(action, LoadComponentsList.done)) {
        return handleComponentListLoaded(state, action.payload.result.data);
    } else if (isType(action, LoadComponentsList.failed)) {
        return logRequestFailure(state, action);
    } else if (isType(action, UpdateNewComponent)) {
        const {name, description} = action.payload;
        return updateNewComponent(state, name, description);
    } else if (isType(action, CreateNewComponent.failed)) {
        return logRequestFailure(state, action);
    }
    else {
        return state;
    }
}
