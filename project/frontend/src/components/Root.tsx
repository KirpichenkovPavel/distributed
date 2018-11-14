import * as React from "react";
import {RootCallbacks, RootProps} from "../interfaces/containers";

export default class Root extends React.Component<RootProps & RootCallbacks> {

    render() {
        return <div>
            {"This is a root container"}
        </div>
    }
}
