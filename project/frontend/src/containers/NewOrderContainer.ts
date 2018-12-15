import {NewOrderCallbacks, NewOrderProps} from "../interfaces/components";
import {ApplicationState} from "../interfaces/reducers";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import NewOrder from "../components/NewOrder";

function mapStateToProps(state): NewOrderProps{
    return {

    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): NewOrderCallbacks {
    return {

    }
}

const NewOrderContainer = connect(mapStateToProps, mapDispatchToProps)(NewOrder);
export default NewOrderContainer;
