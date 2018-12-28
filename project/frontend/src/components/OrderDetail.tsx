import * as React from "react";
import {GenericTableColumn, OrderDetailCallbacks, OrderDetailProps} from "../interfaces/components";
import {Button, ButtonToolbar, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import {bsAll} from "../util";
import * as moment from "moment";
import Table from "./Table";
import {StorageItem} from "../interfaces/data";
import {orderStatusInfoByStatusName} from "../constants";

export default class OrderDetail extends React.Component<OrderDetailProps & OrderDetailCallbacks> {

    componentDidMount() {
        this.props.loadDetail();
    }

    render() {
        return <>
            {this.props.loaded &&
            <FormGroup>
                {this.props.showStorageSelector &&
                <StorageSelector {...this.props}/>}
                <Buttons {...this.props}/>
                <OrderNumber {...this.props}/>
                <OrderStatus {...this.props}/>
                <OrderCreator {...this.props}/>
                <OrderExecutor {...this.props}/>
                <CreationDate {...this.props}/>
                <OrderItems {...this.props}/>
                <OrderPrice {...this.props}/>
                <OrderStorage {...this.props}/>
                <OrderPayment {...this.props}/>
            </FormGroup>}
        </>
    }
}

function withLabel(component: JSX.Element, label: string): JSX.Element {
    return <Row>
        <Col {...bsAll(3)}>
            <ControlLabel className={"pull-right"}>{`${label}:`}</ControlLabel>
        </Col>
        <Col {...bsAll(6)}>{component}</Col>
    </Row>
}

function OrderNumber(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    return withLabel(<>{`#${props.id || ""}`}</>, "Number");
}

function OrderStatus(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    const statusInfo = orderStatusInfoByStatusName.get(props.status);
    return withLabel(<>{`${statusInfo && statusInfo.displayName}`}</>, "Status");
}

function OrderCreator(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    return withLabel(<>{`${props.from || ""}`}</>, "Created by");
}

function OrderExecutor(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    return withLabel(<>{`${props.to || ""}`}</>, "Executed by");
}

function CreationDate(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    const date = moment(props.created);
    const formatted = date.isValid() ? date.format('MMMM Do YYYY, h:mm:ss a') : '';
    return withLabel(<>{formatted}</>, "Created");
}

function OrderItems(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    const columns: Array<GenericTableColumn<StorageItem>> = [
        {
            text: "Name",
            cellRenderer: item => <>{item.name}</>,
            className: ""
        },
        {
            text: "Amount",
            cellRenderer: item => <div className={"text-center"}>{item.amount}</div>,
            className: ""
        },
        {
            text: "Price",
            cellRenderer: item => <div className={"text-center"}>{item.price}</div>,
            className: ""
        }
    ];
    return withLabel(<Table columns={columns} data={props.items}/>, "Components");
}

function OrderPrice(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    const price = props.items.reduce((sum, next) => (sum + next.price * next.amount), 0);
    return withLabel(<>{price}</>, "Total cost");
}

function OrderPayment(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    return withLabel(<>{props.payment && props.payment.status || ""}</>, "Payment");
}

function OrderStorage(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    return withLabel(<>{props.storage && props.storage.name || ""}</>, "Storage")
}

function Buttons(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    return <ButtonToolbar className={"pull-right"}>
        {props.showPaymentButton && <Button
            bsStyle={"success"}
            onClick={props.purchase}
        >{
            "Purchase"
        }</Button>}
        {props.showProceedButton &&
        <Button
            bsStyle={"success"}
            onClick={props.process}
        >{
            orderStatusInfoByStatusName.get(props.status).next
        }</Button>}
        {props.showCancelButton && <Button
            bsStyle={"danger"}
            onClick={props.cancel}
        >{
            "Cancel"
        }</Button>}
    </ButtonToolbar>
}

function StorageSelector(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    const onChange = event => {
        const value = event.target.value;
        if (value > 0) {
            props.selectTargetStorage(value);
        }
    };
    return <Row className={"block-row"}>
        <Col {...bsAll(4)} className={"pull-right"}>
            <FormGroup controlId="formControlsSelect">
                <FormControl
                    className={"pull-right"}
                    componentClass="select"
                    placeholder="select storage"
                    onChange={onChange}
                    value={props.selectedTargetStorage}
                >
                    <option key={0} value={0}>{"Select target storage"}</option>
                    {props.ownedStorages.map(storage => (
                        <option
                            key={storage.id}
                            value={storage.id}>{storage.name}</option>
                    ))}
                </FormControl>
            </FormGroup>
        </Col>
    </Row>
}