import * as React from "react";
import {OrderListCallbacks, OrderListProps} from "../interfaces/components";
import {bsAll} from "../util";
import {Col, FormControl, Row} from "react-bootstrap";
import Paginator from "./pagination/Paginator";
import Table from "./Table";
import {Order, StatusInfo} from "../interfaces/data";
import moment = require("moment");
import "../styles/orders.scss";
import {orderStatusInfoByStatusName} from "../constants";

export default class OrderList extends React.Component<OrderListProps & OrderListCallbacks> {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        return <>
            <OrderTableFilter {...this.props}/>
            {this.props.last > 0 &&
                <OrderListPaginator {...this.props}/>
            }
            {this.props.orders.length > 0 &&
                <>
                    <OrderListTable {...this.props}/>
                </>
            }
            {this.props.orders.length === 0 &&
                <h4 className={"text-center"}>{"No orders"}</h4>
            }
        </>
    }
}

function OrderListPaginator(props: OrderListProps & OrderListCallbacks): JSX.Element {
    return <Row className={"block-row paginator text-center"}>
        <Col {...bsAll(12)}>
            <Paginator
                selected={props.page + 1}
                total={props.last + 1}
                onChange={selectedPage => props.changePage(selectedPage - 1)}
            />
        </Col>
    </Row>
}

function OrderListTable(props: OrderListProps & OrderListCallbacks): JSX.Element {
    const idColumn = {
        className: "id",
        text: "Order number",
        cellRenderer: (item: Order, row, column) =>
            <div
                onClick={() => props.toOrderDetail(item.id)}
            >
                {item.id}
            </div>
    };
    const statusColumn = {
        className: "status",
        text: "Order status",
        cellRenderer: (item: Order, row, column) => (<>{orderStatusInfoByStatusName.get(item.status).displayName}</>)
    };
    const createdColumn = {
        className: "created",
        text: "Created",
        cellRenderer: (item: Order, row, column) => {
            const creationDate = moment(item.created);
            if (creationDate.isValid()) {
                return <>{creationDate.format('MMMM Do YYYY, h:mm:ss a')}</>
            } else {
                return <></>
            }
        }
    };

    return <Table
        data={props.orders}
        columns={[
            idColumn,
            statusColumn,
            createdColumn
        ]}
    />;
}

function OrderTableFilter(props: OrderListProps & OrderListCallbacks): JSX.Element {
    return <Row className={"block-row"}>
        <Col {...bsAll(12)}>
            <FormControl
                className={"pull-right transparent"}
                componentClass={"select"}
                value={props.status}
                onChange={(e: any) => props.changeStatusFilter(e.target.value)}
            >
                {[...orderStatusInfoByStatusName.entries()].map(([val, statusInfo]: [string, StatusInfo]) =>
                    <option key={val} value={val}>{statusInfo.displayName}</option>
                )}
            </FormControl>
        </Col>
    </Row>
}
