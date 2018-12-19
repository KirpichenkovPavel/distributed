import * as React from "react";
import {Pagination} from "react-bootstrap";
import {padded, pagination} from "./pagination";

export interface PaginatorProps {
    total: number
    selected: number

    onChange: (selectedPage: number) => void
}

export default class Paginator extends React.Component<PaginatorProps> {

    get items(): Array<number|string> {
        return pagination(this.props.selected, this.props.total, 2)
    }

    onClickPrev = (event) => {
        if (this.props.selected > 1) {
            this.props.onChange(this.props.selected - 1)
        }
    };

    onClickNext = (event) => {
        if (this.props.selected < this.props.total) {
            this.props.onChange(this.props.selected + 1)
        }
    };

    onClickFirst = (event) => {
        if (this.props.selected !== 1) {
            this.props.onChange(1)
        }
    };

    onClickLast = (event) => {
        if (this.props.selected !== this.props.total) {
            this.props.onChange(this.props.total)
        }
    };

    onClickPage = (pageNum: number) => {
        if (pageNum !== this.props.selected) {
            this.props.onChange(pageNum)
        }
    };

    render() {
        return <Pagination bsSize='medium'>
            <Pagination.First onClick={this.onClickFirst}/>
            <Pagination.Prev onClick={this.onClickPrev}/>
            {this.items.map((item, ix) => {
                switch (typeof item) {
                    case 'number':
                        const num = item as number;
                        return <Pagination.Item
                            key={ix}
                            active={item === this.props.selected}
                            onClick={event => this.onClickPage(num)}
                        >{padded(num, this.props.total)}</Pagination.Item>;
                    case 'string':
                        return <Pagination.Ellipsis key={ix}/>
                }
            })}
            <Pagination.Next onClick={this.onClickNext}/>
            <Pagination.Last onClick={this.onClickLast}/>
        </Pagination>
    }
}