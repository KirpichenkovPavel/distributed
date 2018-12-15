import * as React from "react";
import {NewOrderCallbacks, NewOrderProps} from "../interfaces/components";
import {Col, FormControl, FormGroup, Glyphicon, Row} from "react-bootstrap";
import {bsAll} from "../util";
import {StorageItem} from "../interfaces/data";
import "../styles/newOrder.scss";

export default class NewOrder extends React.Component<NewOrderProps & NewOrderCallbacks> {

    componentDidMount() {
        this.props.onMount();
    }

    render () {
        return <>
            <Row>
                <Col {...bsAll(6)}>
                    <StorageSelector {...this.props}/>
                </Col>
            </Row>
            {this.props.availableItems.length > 0 &&
            <AvailableItemsTable {...this.props}/>
            }
        </>
    }
}

function StorageSelector(props: NewOrderProps & NewOrderCallbacks): JSX.Element {
    const changeStorage = (event) => {
        const newValue = event.target.value;
        if (newValue > 0) {
            props.onSelectStorage(newValue);
        }
    };

    return <FormGroup controlId="formControlsSelect">
        <FormControl
            componentClass="select"
            placeholder="select storage"
            onChange={changeStorage}
            value={props.selectedStorageId}
        >
            <option key={0} value={0}>{""}</option>
            {props.storages.map(storage => (
                <option
                    key={storage.id}
                    value={storage.id}>{storage.name}</option>
            ))}
        </FormControl>
    </FormGroup>
}

function AvailableItemsTable(props: NewOrderProps & NewOrderCallbacks): JSX.Element {
    return <table className={"table-bordered available-items"}>
        <thead>
            <tr>
                <th className={"component"}>{"Component"}</th>
                <th className={"price"}>{"Price"}</th>
                <th className={"available"}>{"Available"}</th>
                <th className={"add"}>{"Add"}</th>
            </tr>
        </thead>
        <tbody>{props.availableItems.map((item: StorageItem) => (
            <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.amount}</td>
                <td>
                    <Glyphicon glyph={"plus"}/>
                </td>
            </tr>
        ))}</tbody>
    </table>
}