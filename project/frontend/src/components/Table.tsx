import * as React from "react";
import {GenericTableColumn, TableProps} from "../interfaces/components";

export default class Table<TableItem> extends React.Component<TableProps<TableItem>> {
    public static defaultProps: Partial<TableProps<any>> = {
        className: ""
    };

    render() {
        return <table className={`table-bordered items-table ${this.props.className}`}>
            <thead>
            <tr>
                {this.props.columns.map((column: GenericTableColumn<TableItem>, ix: number) =>
                    <th key={`ah-${ix}`}
                        className={column.className}
                    >{
                        column.text
                    }</th>
                )}
            </tr>
            </thead>
            <tbody>{this.props.data.map((item: TableItem, ix: number) => (
                <tr key={`row-${ix}`}>
                    {this.props.columns.map((column: GenericTableColumn<TableItem>, hix: number) => (
                        <td key={`ah-${ix}-${hix}`} className={column.className}>
                            {column.cellRenderer(item, ix, hix + 2)}
                        </td>
                    ))}
                </tr>
            ))}</tbody>
        </table>
    }
}