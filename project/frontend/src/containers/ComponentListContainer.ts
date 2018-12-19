import {ApplicationState} from "../interfaces/reducers";
import {ComponentListCallbacks, ComponentListProps} from "../interfaces/components";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {connect} from "react-redux";
import ComponentList from "../components/ComponentList";
import {componentListRequestForComponentsPage, createNewComponentRequest} from "../action_handlers/requests";
import {ChangeComponentListPage, UpdateNewComponent} from "../actions";

const mapStateToProps = (state: ApplicationState): ComponentListProps => {
    return {
        components: state.componentList.components,
        newComponent: state.componentList.newComponent,
        last: state.componentList.last,
        page: state.componentList.page,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<ApplicationState, void, AnyAction>): ComponentListCallbacks => {
    return {
        onComponentListUpdateNeeded: () => dispatch(componentListRequestForComponentsPage),
        onUpdateNewComponentName: name => dispatch(UpdateNewComponent({name: name})),
        onUpdateNewComponentDescription: description => dispatch(UpdateNewComponent({description: description})),
        onAddComponent: () => dispatch(createNewComponentRequest),
        onPageChange: page => {
            dispatch(ChangeComponentListPage({page: page}));
            dispatch(componentListRequestForComponentsPage);
        },
    }
};

const ComponentListContainer = connect(mapStateToProps, mapDispatchToProps)(ComponentList);
export default ComponentListContainer;