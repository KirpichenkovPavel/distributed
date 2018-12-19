import * as React from "react";
import {NewOrderCallbacks, NewOrderProps} from "../interfaces/components";
import {Button, ButtonToolbar, Col, Row} from "react-bootstrap";
import {bsAll} from "../util";
import "../styles/newOrder.scss";
import {StorageSelector} from "./StorageSelector";
import {AvailableItemsTable, SelectedItemsTable} from "./NewOrderItemTables";

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
            <Row>
                <Col {...bsAll(12)}>
                    <h4 className={"text-center"}>{"Available components"}</h4>
                </Col>
                <Col {...bsAll(12)}>
                    <AvailableItemsTable {...this.props}/>
                </Col>
            </Row>
            }
            {this.props.selectedItems.filter(it => it.amount > 0).length > 0 &&
            <>
                <Row className={"selected-items"}>
                    <Col {...bsAll(12)}>
                        <h4 className={"text-center"}>{"You selected"}</h4>
                    </Col>
                    <Col {...bsAll(12)}>
                        <SelectedItemsTable {...this.props}/>
                    </Col>
                </Row>
                <Row className={"block-row"}>
                    <Col {...bsAll(12)}>
                        <Button
                            className={""}
                            bsStyle={"primary"}
                            onClick={this.props.onSaveNewOrder}
                        >{"Save order"}</Button>
                    </Col>
                </Row>
            </>
            }
        </>
    }
}
