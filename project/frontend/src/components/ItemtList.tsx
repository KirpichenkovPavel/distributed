import * as React from "react";
import {ItemListProps, ItemListState} from "../interfaces/components";

export default class ItemtList extends React.Component<ItemListProps, ItemListState> {

    render() {
        return <table>
            <thead>
                <tr>
                    <th>{"Название"}</th>
                    <th>{"Количество"}</th>
                    <th>{"Цена"}</th>
                </tr>
            </thead>
            <tbody>{
                this.props.items.map(item =>
                    <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>{item.price}</td>
                    </tr>
                )
            }</tbody>
        </table>
    }
}