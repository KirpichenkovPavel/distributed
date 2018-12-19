import * as React from "react";
import {NewOrderCallbacks, NewOrderProps} from "../interfaces/components";
import {FormControl, FormGroup} from "react-bootstrap";

export function StorageSelector(props: NewOrderProps & NewOrderCallbacks): JSX.Element {
    const changeStorage = (event) => {
        const newValue = event.target.value;
        if (newValue > 0) {
            props.onSelectStorage(newValue);
        }
    };

    return <FormGroup controlId="formControlsSelect">
        <FormControl
            componentClass="select"
            placeholder="select storage"
            onChange={changeStorage}
            value={props.selectedStorageId}
        >
            <option key={0} value={0}>{""}</option>
            {props.storages.map(storage => (
                <option
                    key={storage.id}
                    value={storage.id}>{storage.name}</option>
            ))}
        </FormControl>
    </FormGroup>
}