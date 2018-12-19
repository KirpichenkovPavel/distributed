import * as React from "react";
import {ComponentListCallbacks, ComponentListProps, ComponentListState} from "../interfaces/components";
import {
    Button,
    ButtonToolbar,
    Col,
    ControlLabel, FormControl,
    FormGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "react-bootstrap";
import {bsAll} from "../util";
import {Component} from "../interfaces/data";
import "../styles/componentList.scss";
import TextareaAutosize from "react-textarea-autosize";
import Paginator from "./pagination/Paginator";

export default class ComponentList extends React.Component<ComponentListProps & ComponentListCallbacks, ComponentListState> {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    }

    componentDidMount() {
        this.props.onComponentListUpdateNeeded();
    }

    closeModal = () => {
        this.setState({showModal: false});
    };

    createItem = () => {
        this.props.onAddComponent();
        this.setState({showModal: false});
    };

    get buttons(): JSX.Element {
        return <Row className={"page-row"}>
            <Col {...bsAll(12)}>
                <ButtonToolbar className={"pull-right"}>
                    <Button
                        bsStyle={"primary"}
                        onClick={() => this.setState({showModal: true})}
                    >{"Add new component"}</Button>
                </ButtonToolbar>
            </Col>
        </Row>
    }

    get componentsTable(): JSX.Element {
        return <table className={"table-bordered component-list page-row"}>
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

    get paginator(): JSX.Element {
        return <Row className={"block-row paginator text-center"}>
            <Col {...bsAll(12)}>
                <Paginator
                    selected={this.props.page + 1}
                    total={this.props.last + 1}
                    onChange={selectedPage => this.props.onPageChange(selectedPage - 1)}
                />
            </Col>
        </Row>
    }

    get addItemModal(): JSX.Element {
        return <Modal
            onHide={this.closeModal}
            show={this.state.showModal}
        >
            <ModalHeader>
                <h4>{"Add new component"}</h4>
            </ModalHeader>
            <ModalBody>{
                <FormGroup>
                    <Row className={"modal-row"}>
                        <Col {...bsAll(3)}>
                            <ControlLabel className={"modal-row-label"}>{"Name"}</ControlLabel>
                        </Col>
                        <Col {...bsAll(9)}>
                            <FormControl
                                type={"text"}
                                value={this.props.newComponent.name}
                                onChange={(e: any) => this.props.onUpdateNewComponentName(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row className={"modal-row"}>
                        <Col {...bsAll(3)}>
                            <ControlLabel className={"modal-row-label"}>{"Description"}</ControlLabel>
                        </Col>
                        <Col {...bsAll(9)}>
                            <TextareaAutosize
                                className={"modal-textarea"}
                                value={this.props.newComponent.description}
                                minRows={3}
                                maxRows={15}
                                onChange={(e: any) => this.props.onUpdateNewComponentDescription(e.target.value)}
                            />
                        </Col>
                    </Row>
                </FormGroup>
            }</ModalBody>
            <ModalFooter>
                <Button onClick={this.closeModal}>{"Close"}</Button>
                <Button
                    bsStyle={"primary"}
                    onClick={this.createItem}
                >{"Create"}</Button>
            </ModalFooter>
        </Modal>
    }

    render() {
        return <>
            {this.addItemModal}
            {this.buttons}
            {this.props.last > 0 && this.paginator}
            {this.props.components.length > 0 && this.componentsTable}
        </>
    }
}