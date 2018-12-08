import * as React from "react";
import {MenuProps} from "../interfaces/components";
import {
    Button,
    ButtonToolbar, Col, ControlLabel,
    DropdownButton, FormControl, FormGroup,
    MenuItem,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row
} from "react-bootstrap";
import "../styles/menu.scss";
import {bsAll} from "../util";

export default function Menu(props: MenuProps) {
    return <>
        <MenuModal {...props}/>
        <MenuButtons {...props}/>
    </>
}

function MenuModal(props: MenuProps): JSX.Element {
    return <Modal
        onHide={props.modalClose}
        show={props.loginInfo.registerActive || props.loginInfo.signInActive}>
        <ModalHeader>{
            props.loginInfo.signInActive ? "Sign in" : "Register"
        }</ModalHeader>
        <ModalBody>
            <FormGroup>
                <Row className={"modal-row"}>
                    <Col {...bsAll(3)}>
                        <ControlLabel className={"modal-row-label"}>{"User name"}</ControlLabel>
                    </Col>
                    <Col {...bsAll(9)}>
                        <FormControl
                            type={"text"}
                            value={props.loginInfo.nameInput}
                            onChange={(e: any) => props.modalInputChange(e.target.value)}
                        />
                    </Col>
                </Row>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
            <Button onClick={props.modalClose}>{"Close"}</Button>
            <Button
                bsStyle={"primary"}
                onClick={props.modalConfirm}
            >{"Confirm"}</Button>
        </ModalFooter>
    </Modal>
}

function MenuButtons(props: MenuProps): JSX.Element {
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
        <span className={"pull-right"}>
            {props.userName === null &&
            <>
                <Button
                bsStyle={"success"}
                className={"auth-btn"}
                onClick={() => props.modalOpen(true)}
                >{"Sign in"}</Button>
                <Button
                    bsStyle={"primary"}
                    className={"auth-btn"}
                    onClick={() => props.modalOpen(false)}
                >{"Register"}</Button>
            </>}
            {props.userName !== null && <>
                <Button
                    bsStyle={"info"}
                    className={"auth-btn"}
                    onClick={() => props.logout()}
                >{"Log out"}</Button>
            </>
            }
            </span>
    </ButtonToolbar>
}