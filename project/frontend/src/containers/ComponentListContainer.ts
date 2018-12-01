import {ApplicationState} from "../interfaces/reducers";
import {ComponentListCallbacks, ComponentListProps} from "../interfaces/components";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import ComponentList from "../components/ComponentList";

const mapStateToProps = (state: ApplicationState, containerProps: {}): ComponentListProps => {
    return {

    }
};

const mapDispatchToProps = (
        dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
        containerProps: {}): ComponentListCallbacks => {
    return {

    }
};

const ComponentListContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentList);
export default ComponentListContainer;