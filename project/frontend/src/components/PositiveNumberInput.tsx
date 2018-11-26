import * as React from 'react';

import {FormControl} from "react-bootstrap";

interface PositiveNumberInputProps {
    value: number,
    className?: string,
    disabled?: boolean,

    inputRef?: (node: HTMLInputElement) => void;
    onChange?: (value: number) => void
}

export default class PositiveNumberInput extends React.PureComponent<PositiveNumberInputProps, {
    internalValue: string
}> {

    numberInput: HTMLInputElement;

    public static defaultProps: Partial<PositiveNumberInputProps> = {
        className: "",
        disabled: false,

        onChange: () => {
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            internalValue: this.props.value.toString()
        }
    }

    componentWillReceiveProps(nextProps: PositiveNumberInputProps) {
        this.setState({internalValue: nextProps.value.toString()});
    }

    componentDidMount() {
        if (this.props.inputRef)
            this.props.inputRef(this.numberInput)
    }

    onChange = (e: React.ChangeEvent<any>) => {
        let value = e.target.value as string;

        if (!value) {
            this.setState({internalValue: ""});
            if (this.props.value)
                this.props.onChange(0);
        } else {
            let numValue = parseInt(value);
            if (isNaN(numValue)) {
                this.setState({internalValue: ""});
                if (this.props.value)
                    this.props.onChange(0);
            }
            numValue = Math.max(numValue, 0);
            this.setState({internalValue: numValue.toString()});
            this.props.onChange(numValue);
        }
    };

    onFocus = () => {
        if (!parseInt(this.state.internalValue))
            this.setState({internalValue: ""})
    };

    onBlur = () => {
        if (!parseInt(this.state.internalValue))
            this.setState({internalValue: "0"})
    };

    render() {
        return <FormControl
            value={this.state.internalValue}
            type="number"
            inputRef={(input) => this.numberInput = input}
            disabled={this.props.disabled}
            className={this.props.className}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
        />
    }
}