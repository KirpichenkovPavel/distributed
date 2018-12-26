import * as React from "react";
import {GenericTableColumn, OrderDetailCallbacks, OrderDetailProps} from "../interfaces/components";
import {Button, ButtonToolbar, Col, ControlLabel, FormGroup, Row} from "react-bootstrap";
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
                <ButtonToolbar className={"pull-right"}>
                    {this.props.showProceedButton &&
                    <Button
                        bsStyle={"success"}
                        onClick={this.props.process}
                    >{
                        orderStatusInfoByStatusName.get(this.props.status).next
                    }</Button>}
                    <Button
                        bsStyle={"danger"}
                        onClick={this.props.cancel}
                    >{
                        "Cancel"
                    }</Button>
                </ButtonToolbar>
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
            cellRenderer: item => <>{item.amount}</>,
            className: ""
        },
        {
            text: "Price",
            cellRenderer: item => <>{item.price}</>,
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