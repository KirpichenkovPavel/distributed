import * as React from "react";
import {ComponentListProps, ComponentListState} from "../interfaces/components";

export default class ComponentList extends React.Component<ComponentListProps, ComponentListState> {

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
                this.props.components.map(item =>
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