import * as React from "react";
import * as NumericInput from "react-numeric-input";
import "../styles/decimal_number_input.scss";

export interface DecimalNumberInputProps {
    value: number
    onChange?: (value: number) => void
    min?: number
    max?: number
    step?: number
    precision?: number
}

export default class DecimalNumberInput extends React.Component<DecimalNumberInputProps> {

    public static defaultProps: Partial<DecimalNumberInputProps> = {
        onChange: () => {},
        min: -Infinity,
        max: Infinity,
        step: 0.1,
        precision: 2
    };

    parse = (s: string): number | string => {
        return parseFloat(s) || 0;
    };

    onBlur = () => {
        console.log(`${this.props.value} ${this.props.min} ${this.props.max}`);
        if (this.props.value < this.props.min)
            this.props.onChange(this.props.min);
        if (this.props.value > this.props.max)
            this.props.onChange(this.props.max);
    };

    render() {
        return <NumericInput
            value={this.props.value}
            onChange={this.props.onChange}
            min={this.props.min}
            max={this.props.max}
            step={this.props.step}
            precision={this.props.precision}
            parse={this.parse}
            style={false}
            onBlur={this.onBlur}
        />
    }
}