import * as React from "react";
import {ItemListCallbacks, ItemListProps, ItemListState} from "../interfaces/components";
import {
    Button,
    ButtonToolbar,
    Col, ControlLabel,
    FormControl,
    FormGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "react-bootstrap";
import {bsAll} from "../util";
import '../styles/itemList.scss';
import PositiveNumberInput from "./PositiveNumberInput";
import Autocomplete from "./Autocomplete";

export default class ItemList extends React.Component<ItemListProps & ItemListCallbacks, ItemListState> {
    constructor(props) {
        super(props);
        this.state = getDefaultState();
    }

    componentDidMount() {
        this.props.onMount();
    }

    changeStorage = (event) => {
        const newValue = event.target.value;
        if (newValue > 0) {
            this.props.onStoragePick(newValue);
        }
    };

    get storageSelector(): JSX.Element {
        return <FormGroup controlId="formControlsSelect">
            <FormControl
                componentClass="select"
                placeholder="select storage"
                onChange={this.changeStorage}
                value={this.props.storage.selectedStorageId}
            >
                <option key={0} value={0}>{""}</option>
                {this.props.storage.allStorages.map(storage => (
                    <option
                        key={storage.id}
                        value={storage.id}>{storage.name}</option>
                ))}
            </FormControl>
        </FormGroup>
    }

    get controlButtons(): JSX.Element {
        return <ButtonToolbar className={"pull-right"}>
            {this.props.storage.selectedStorageId > 0 &&
            <Button
                bsStyle={"primary"}
                onClick={() => this.setState({showModal: true})}
            >{"Add new item"}
            </Button>}
        </ButtonToolbar>
    }

    get itemsTable(): JSX.Element {
        return this.props.storage.storageItems.length > 0 &&
            <table className={'table-bordered table-block items-table'}>
                <thead>
                <tr>
                    <th className={"th-name"}>{"Name"}</th>
                    <th className={"th-amount"}>{"Amount"}</th>
                    <th className={"th-price"}>{"Price"}</th>
                </tr>
                </thead>
                <tbody>{
                    this.props.storage.storageItems.map(item =>
                        <tr key={item.name}>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{item.price}</td>
                        </tr>
                    )
                }</tbody>
            </table>
    }
    
    closeModal = () => this.setState({showModal: false});

    addItem = () => {
        this.props.onAddItem();
        this.setState({showModal: false});
    };

    get addItemModal(): JSX.Element {
        return <Modal
            onHide={this.closeModal}
            show={this.state.showModal}
        >
            <ModalHeader>
                <h4>{"Add new item"}</h4>
            </ModalHeader>
            <ModalBody>{
                <FormGroup>
                    <Row className={"modal-row"}>
                        <Col {...bsAll(3)}>
                            <ControlLabel className={"modal-row-label"}>{"Component"}</ControlLabel>
                        </Col>
                        <Col {...bsAll(9)}>
                            <Autocomplete
                                options={this.props.storage.componentAutocomplete.options}
                                onSelect={(wrapped: string[]) => this.props.onSelectComponent(wrapped[0] || "")}
                                onInputChange={this.props.onComponentSearch}
                            />
                        </Col>
                    </Row>
                    <Row className={"modal-row"}>
                        <Col {...bsAll(3)}>
                            <ControlLabel className={"modal-row-label"}>{"Amount"}</ControlLabel>
                        </Col>
                        <Col {...bsAll(9)}>
                            <PositiveNumberInput
                                value={this.props.storage.newItem.amount}
                                onChange={this.props.onSetItemAmount}
                            />
                        </Col>
                    </Row>
                    <Row className={"modal-row"}>
                        <Col {...bsAll(3)}>
                            <ControlLabel className={"modal-row-label"}>{"Price"}</ControlLabel>
                        </Col>
                        <Col {...bsAll(9)}>
                            <PositiveNumberInput
                                value={this.props.storage.newItem.price}
                                onChange={this.props.onSetItemPrice}
                            />
                        </Col>
                    </Row>
                </FormGroup>
            }</ModalBody>
            <ModalFooter>
                <Button onClick={this.closeModal}>{"Close"}</Button>
                <Button
                    bsStyle={"primary"}
                    onClick={this.addItem}
                >{"Add"}</Button>
            </ModalFooter>
        </Modal>
    }

    render() {
        return <>
            {this.addItemModal}
            <Row>
                <Col {...bsAll(6)}>
                    {this.storageSelector}
                </Col>
                <Col {...bsAll(6)}>
                    {this.controlButtons}
                </Col>
            </Row>
            {this.itemsTable}
        </>
    }
}

function getDefaultState(): ItemListState {
    return {
        showModal: false
    }
}