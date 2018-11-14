import {ApplicationState} from "../interfaces/reducers";
import {RootCallbacks, RootContainerProps, RootProps} from "../interfaces/containers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import Root from "../components/Root";

const mapStateToProps = (store: ApplicationState, props: RootContainerProps): RootProps => {
    return {

    }
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<ApplicationState, void, AnyAction>,
    props: RootProps
): RootCallbacks => {
    return {

    }
};

const RootContainer = connect(mapStateToProps, mapDispatchToProps)(Root);
export default RootContainer;