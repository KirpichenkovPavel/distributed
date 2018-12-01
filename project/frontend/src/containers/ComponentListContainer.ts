import {ApplicationState} from "../interfaces/reducers";
import {ComponentListCallbacks, ComponentListProps} from "../interfaces/components";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import ComponentList from "../components/ComponentList";
import {componentListRequestForComponentsPage, createNewComponentRequest} from "../action_handlers/requests";
import {UpdateNewComponent} from "../actions";

const mapStateToProps = (state: ApplicationState): ComponentListProps => {
    return {
        components: state.componentList.components,
        newComponent: state.componentList.newComponent
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): ComponentListCallbacks => {
    return {
        onMount: () => dispatch(componentListRequestForComponentsPage),
        onUpdateNewComponentName: name => dispatch(UpdateNewComponent({name: name})),
        onUpdateNewComponentDescription: description => dispatch(UpdateNewComponent({description: description})),
        onAddComponent: () => dispatch(createNewComponentRequest)
    }
};

const ComponentListContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentList);
export default ComponentListContainer;