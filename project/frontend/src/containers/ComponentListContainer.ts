import {ApplicationState} from "../interfaces/reducers";
import {ComponentListCallbacks, ComponentListProps} from "../interfaces/components";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import ComponentList from "../components/ComponentList";
import {componentListRequestForComponentsPage} from "../action_handlers/requests";

const mapStateToProps = (state: ApplicationState): ComponentListProps => {
    return {
        components: state.componentList.components
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): ComponentListCallbacks => {
    return {
        onMount: () => dispatch(componentListRequestForComponentsPage)
    }
};

const ComponentListContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentList);
export default ComponentListContainer;