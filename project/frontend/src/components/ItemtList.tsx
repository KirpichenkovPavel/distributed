import * as React from "react";
import {ItemListCallbacks, ItemListProps, ItemListState} from "../interfaces/components";
import {Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import {bsAll} from "../util";

export default class ItemtList extends React.Component<ItemListProps & ItemListCallbacks, ItemListState> {

    componentDidMount() {
        this.props.onMount();
    }

    changeStorage = (event) => {
        this.props.onStoragePick(event.target.value);
        console.log(`picking storage ${event.target.value}`);
    };

    render() {
        return <>
            <Row>
                <Col {...bsAll(6)}>
                    <FormGroup controlId="formControlsSelect">
                        <FormControl
                            componentClass="select"
                            placeholder="select storage"
                            onChange={this.changeStorage}
                        >
                            <option key={0} value={0}>{""}</option>
                            {this.props.storage.allStorages.map(storage => (
                                <option
                                    key={storage.id}
                                    value={storage.id}>{storage.name}</option>
                            ))}
                        </FormControl>
                    </FormGroup>
                </Col>
            </Row>
            {this.props.storage.storageItems.length > 0 && <table className={'table-bordered table-block'}>
                <thead>
                <tr>
                    <th>{"Name"}</th>
                    <th>{"Amount"}</th>
                    <th>{"Price"}</th>
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
            </table>}
        </>
    }
}

