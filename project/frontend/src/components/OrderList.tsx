import * as React from "react";
import {OrderListCallbacks, OrderListProps} from "../interfaces/components";
import {bsAll} from "../util";
import {Col, Row} from "react-bootstrap";
import Paginator from "./pagination/Paginator";
import Table from "./Table";
import {Order} from "../interfaces/data";

export default class OrderList extends React.Component<OrderListProps & OrderListCallbacks> {
    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        return <>
            {this.props.last > 0 &&
                <OrderListPaginator {...this.props}/>
            }
            {this.props.orders.length > 0 &&
                <OrderListTable {...this.props}/>
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
        cellRenderer: (item: Order, row, column) => (<div>{item.id}</div>)
    };
    const statusColumn = {
        className: "status",
        text: "Order status",
        cellRenderer: (item: Order, row, column) => (<>{item.status}</>)
    };
    const createdColumn = {
        className: "created",
        text: "Created",
        cellRenderer: (item: Order, row, column) => (<>{item.created}</>)
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
