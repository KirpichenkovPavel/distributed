import * as React from "react";
import {RootCallbacks, RootProps} from "../interfaces/containers";

export default class Root extends React.Component<RootProps & RootCallbacks> {

    componentDidMount() {
        this.props.onMount();
    }

    render() {
        return <>
            {"This is a root container"}
        </>
    }
}
