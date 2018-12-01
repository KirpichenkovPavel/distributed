import * as React from "react";
import {ComponentListCallbacks, ComponentListProps} from "../interfaces/components";
import {Button, ButtonToolbar, Col, Row} from "react-bootstrap";
import {bsAll} from "../util";
import {Component} from "../interfaces/data";
import "../styles/componentList.scss";

export default class ComponentList extends React.Component<ComponentListProps & ComponentListCallbacks, {}> {

    componentDidMount() {
        this.props.onMount();
    }

    get buttons(): JSX.Element {
        return <Row>
            <Col {...bsAll(12)}>
                <ButtonToolbar className={"pull-right"}>
                    <Button bsStyle={"primary"}>{"Add new component"}</Button>
                </ButtonToolbar>
            </Col>
        </Row>
    }

    get componentsTable(): JSX.Element {
        return <table className={"table-bordered component-list"}>
            <thead>
                <tr>
                    <th className={"th-name"}>{"Name"}</th>
                    <th className={"th-descr"}>{"Description"}</th>
                </tr>
            </thead>
            <tbody>{ this.props.components.map((component: Component) => (
                <tr key={component.name}>
                    <td>{component.name}</td>
                    <td>{component.description}</td>
                </tr>
            ))}</tbody>
        </table>
    }

    render() {
        return <>
            {this.buttons}
            {this.props.components.length > 0 && this.componentsTable}
        </>
    }
}