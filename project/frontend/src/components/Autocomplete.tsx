import * as React from "react";
import {AutocompleteProps, AutocompleteState} from "../interfaces/components";
import {Typeahead} from "react-bootstrap-typeahead";
import {debounce} from "lodash";

export default class Autocomplete<OptionType>
    extends React.Component<AutocompleteProps<OptionType>, AutocompleteState<OptionType>> {
    private ref = null;
    constructor(props) {
        super(props);
    }

    public static defaultProps = {
        additionalProps: {},
        onInputChange: () => {}
    };

    onFocus = () => {
        console.log(this.ref);
        if (this.ref && this.ref.instanceRef.state.text === "") {
            this.props.onInputChange("");
        }
    };

    render() {
        return <Typeahead
            options={this.props.options}
            filterBy={() => true}
            onChange={this.props.onSelect}
            onInputChange={debounce(this.props.onInputChange, 250)}
            onFocus={debounce(this.onFocus, 100)}
            ref={ref => this.ref = ref}
            {...this.props.additionalProps}
        />;
    }
}