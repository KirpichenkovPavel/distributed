import * as React from "react";
import {StorageItem} from "../interfaces/data";
import {ItemsTableColumn, ItemsTableProps} from "../interfaces/components";
import "../styles/itemsTable.scss";

export class ItemsTable extends React.Component<ItemsTableProps>{
    public static defaultProps: Partial<ItemsTableProps> = {
        additionalColumns: [],
        className: ""
    };

    render() {
        return <table className={`table-bordered items-table ${this.props.className}`}>
            <thead>
            <tr>
                <th className={"component"}>{"Component"}</th>
                {this.props.additionalColumns.map((column: ItemsTableColumn, ix: number) =>
                    <th key={`ah-${ix}`}
                        className={column.className}
                    >{
                        column.text
                    }</th>
                )}
            </tr>
            </thead>
            <tbody>{this.props.items.map((item: StorageItem, ix: number) => (
                <tr key={item.name}>
                    <td className={"component text"}>{item.name}</td>
                    {this.props.additionalColumns.map((column: ItemsTableColumn, hix: number) => (
                        <td key={`ah-${ix}-${hix}`} className={column.className}>
                            {column.cellRenderer(item, ix, hix + 2)}
                        </td>
                    ))}
                </tr>
            ))}</tbody>
        </table>
    }
}
