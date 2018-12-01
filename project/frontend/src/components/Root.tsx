import * as React from "react";
import {RootCallbacks} from "../interfaces/components";
import StorageContainer from "../containers/StorageContainer";
import {RootProps} from "../interfaces/components";
import {Col, Row} from "react-bootstrap";
import {bsAll} from "../util";
import Menu from "./Menu";
import {MenuSection, Page} from "../interfaces/data";
import {menuForRoles} from "../constants";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/base.scss';
import ComponentListContainer from "../containers/ComponentListContainer";


export default class Root extends React.Component<RootProps & RootCallbacks> {

    componentDidMount() {
    }

    private get menuItems(): Array<MenuSection> {
        return this.props.activeRoles.reduce((menuSections, nextRole) => {
            menuSections.push(...menuForRoles.get(nextRole));
            return menuSections;
        }, [])
    }

    render() {
        return <>
            <div className={"menu"}>
                <Menu
                    sections={this.menuItems}
                    nextPage={this.props.onNextPage}
                />
            </div>
            {...pageSwitch(this.props.currentPage)}
        </>
    }
}

function pageSwitch(page: Page): JSX.Element[] {
    let header = <div/>, container = <div/>;
    const pageRegistry: Map<Page, [JSX.Element, JSX.Element]> = new Map<Page, [JSX.Element, JSX.Element]>([
        ["storageDetail", [
            <h2>{"Storage info"}</h2>,
            <StorageContainer/>
        ]],
        ["componentList", [
            <h2>{"Components"}</h2>,
            <ComponentListContainer/>
        ]],
        ["none", [
            <></>,
            <></>
        ]]
    ]);
    return [
        <Row key={'page-header'} className={"main-header"}>
            <Col {...bsAll(12)} className={"header-h2"}>
                {pageRegistry.get(page)[0]}
            </Col>
        </Row>,
        <Row key={'page-container'} className={'page-container'}>
            <Col {...bsAll(12)}>
                {pageRegistry.get(page)[1]}
            </Col>
        </Row>
    ];
}
