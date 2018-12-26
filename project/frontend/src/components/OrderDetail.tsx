import * as React from "react";
import {GenericTableColumn, OrderDetailCallbacks, OrderDetailProps} from "../interfaces/components";
import {Col, ControlLabel, FormGroup, Row} from "react-bootstrap";
import {bsAll} from "../util";
import * as moment from "moment";
import Table from "./Table";
import {StorageItem} from "../interfaces/data";
import {orderStatusToDisplayName} from "../constants";

export default class OrderDetail extends React.Component<OrderDetailProps & OrderDetailCallbacks> {

    componentDidMount() {
        this.props.loadDetail();
    }

    render() {
        return <>
            <FormGroup>
                <OrderNumber {...this.props}/>
                <OrderStatus {...this.props}/>
                <OrderCreator {...this.props}/>
                <OrderExecutor {...this.props}/>
                <CreationDate {...this.props}/>
                <OrderItems {...this.props}/>
                <OrderPrice {...this.props}/>
                <OrderPayment {...this.props}/>
            </FormGroup>
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
    return withLabel(<>{`${orderStatusToDisplayName.get(props.status) || ""}`}</>, "Status");
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
    const price = props.items.reduce((sum, next) => (sum + next.price), 0);
    return withLabel(<>{price}</>, "Total cost");
}

function OrderPayment(props: OrderDetailProps & OrderDetailCallbacks): JSX.Element {
    const payment = props.payment || null;
    return withLabel(<div>{props.payment && props.payment.status || ""}</div>, "Payment");
}