import {ApplicationState} from "../interfaces/reducers";
import {AnyAction, AsyncActionCreators} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import axios from "axios";

export function postRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    action: AsyncActionCreators<any, any, any>,
    data: any,
    url: string,
    params: any = {},
    payload: any = {}
) {
    dispatch(action.started({}));
    axios.post(url, data, {params: params})
        .then(response => {
            payload.data = response.data;
            dispatch(action.done({
                params: {},
                result: payload
            }))
        })
        .catch(error => {
            dispatch(action.failed({params: {}, error: error}));
        });
}

export function getRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    action: AsyncActionCreators<any, any, any>,
    url: string,
    requestConfig: any = {},
    payload: any = {}
) {
    dispatch(action.started({}));
    axios.get(url, requestConfig)
        .then(response => {
            payload.data = response.data;
            dispatch(action.done({
                params: {},
                result: payload
            }))
        })
        .catch(error => {
            dispatch(action.failed({params: {}, error: error}));
        });
}
