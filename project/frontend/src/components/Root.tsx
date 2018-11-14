import * as React from "react";
import {RootCallbacks} from "../interfaces/components";
import ItemListContainer from "../containers/ItemListContainer";
import {RootProps} from "../interfaces/components";

export default class Root extends React.Component<RootProps & RootCallbacks> {

    componentDidMount() {
        console.log("Mounted");
        this.props.onUpdate();
    }

    render() {
        return <>
            <ItemListContainer/>
        </>
    }
}
