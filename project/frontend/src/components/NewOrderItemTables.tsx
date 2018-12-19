import * as React from "react";
import {StorageItem} from "../interfaces/data";
import {ItemsTableColumn, NewOrderCallbacks, NewOrderProps} from "../interfaces/components";
import {Glyphicon} from "react-bootstrap";
import DecimalNumberInput from "./DecimalNumberInput";
import {ItemsTable} from "./ItemsTable";

const amountDescriptor: ItemsTableColumn = {
    className: "available number",
    text: "Available",
    cellRenderer: item => <>{item.amount}</>,
};
const priceDescriptor: ItemsTableColumn = {
    className: "price number",
    text: "Price",
    cellRenderer: item => <>{item.price}</>,
};

export function AvailableItemsTable(props: NewOrderProps & NewOrderCallbacks): JSX.Element {

    const glyphIconColumnDescriptor: ItemsTableColumn = {
        className: "add icon",
        text: "Add",
        cellRenderer: (item: StorageItem, rowIx: number, columnIx: number) => {
            return <Glyphicon
                glyph={"plus"}
                onClick={() => props.onAddToSelected(item.name)}
            />
        }
    };
    const selectedAmountColumnDescriptor: ItemsTableColumn = {
        className: "selected-amount number",
        text: "Selected",
        cellRenderer: (item: StorageItem, rowIx: number, columnIx: number) => {
            const selected = props.selectedItems.find(it => it.name === item.name);
            return <DecimalNumberInput
                value={selected ? selected["selectedAmount"] : 0}
                min={0}
                max={item.amount}
                step={1}
                precision={0}
                onChange={amount => props.onChangeItemSelection(item.name, amount, false)}
            />
        }
    };

    return <ItemsTable
        items={props.availableItems}
        className={"available-items"}
        additionalColumns={[
            priceDescriptor,
            amountDescriptor,
            selectedAmountColumnDescriptor,
            glyphIconColumnDescriptor,
        ]}
    />;
}

export function SelectedItemsTable(props: NewOrderProps & NewOrderCallbacks): JSX.Element {
    const selectedAmountDescriptor: ItemsTableColumn = {
        className: "amount number",
        text: "Selected",
        cellRenderer: item => <>{item.amount}</>,
    };

    const plusColumnDescriptor: ItemsTableColumn = {
        className: "plus icon",
        text: "Add",
        cellRenderer: item =>
            <Glyphicon
                glyph={"plus"}
                onClick={() => props.onChangeItemSelection(item.name, item.amount + 1, true)}
            />,
    };

    const minusColumnDescriptor: ItemsTableColumn = {
        className: "minus icon",
        text: "Remove",
        cellRenderer: item =>
            <Glyphicon
                glyph={"minus"}
                onClick={() => props.onChangeItemSelection(item.name, item.amount - 1, true)}
            />,
    };

    return <ItemsTable
        items={props.selectedItems.filter(it => it.amount > 0)}
        className={"selected-items"}
        additionalColumns={[
            priceDescriptor,
            selectedAmountDescriptor,
            plusColumnDescriptor,
            minusColumnDescriptor,
        ]}
    />
}