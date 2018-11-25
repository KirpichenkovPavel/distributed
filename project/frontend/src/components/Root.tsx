import * as React from "react";
import {RootCallbacks} from "../interfaces/components";
import ItemListContainer from "../containers/ItemListContainer";
import {RootProps} from "../interfaces/components";
import {Col, Row} from "react-bootstrap";
import {bsAll} from "../util";
import Menu from "./Menu";
import {MenuSection, Page} from "../interfaces/data";
import {menuForRoles} from "../constants";
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/base.scss';


export default class Root extends React.Component<RootProps & RootCallbacks> {

    componentDidMount() {
        // console.log("Mounted");
        // this.props.onUpdate();
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
    switch (page) {
        case "storageDetail":
            header = <h2>{"Storage info"}</h2>;
            container = <ItemListContainer/>;
            break;
        default:
            break;
    }
    return [
        <Row key={'page-header'} className={"main-header"}>
            <Col {...bsAll(12)} className={"header-h2"}>
                {header}
            </Col>
        </Row>,
        <Row key={'page-container'} className={'page-container'}>
            <Col {...bsAll(12)}>
                {container}
            </Col>
        </Row>
    ];
}
