import * as React from "react";
import {MenuProps} from "../interfaces/components";
import {ButtonToolbar, DropdownButton, MenuItem} from "react-bootstrap";
import "../styles/menu.scss";

export default function Menu(props: MenuProps): JSX.Element {
    return <ButtonToolbar className={'main-menu'}>{
        props.sections.map((section, ix) => (
            <DropdownButton
                key={`section-${section.name}`}
                title={section.name}
                id={`section-id-${ix}`}
                bsStyle={"info"}
                className={"menu-section"}
            >{
                section.items.map((item, ix) => (
                    <MenuItem
                        key={`menu-item-${ix}`}
                        eventKey={`${ix}`}
                        onClick={() => props.nextPage(item.page)}
                    >{
                        item.name
                    }</MenuItem>
                ))
            }</DropdownButton>))
    }
    </ButtonToolbar>
}