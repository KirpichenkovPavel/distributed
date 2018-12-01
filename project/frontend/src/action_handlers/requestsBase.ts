import {ApplicationState} from "../interfaces/reducers";
import {ActionCreator, AnyAction, AsyncActionCreators} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import axios from "axios";

export function postRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    action: AsyncActionCreators<any, any, any>,
    url: string,
    data: any,
    params: any = {},
    payload: any = {},
    dispatchOnSuccess?: (dispatch: ThunkDispatch<any, any, any>, getState: () => ApplicationState) => void | ActionCreator<any>
) {
    dispatch(action.started({}));
    console.log(`post ${url}`);
    console.log(data);
    axios.post(url, data, {params: params})
        .then(response => {
            payload.data = response.data;
            console.log("post ok");
            console.log(response.data);
            dispatch(action.done({
                params: {},
                result: payload
            }));
            if (dispatchOnSuccess) {
                dispatch(dispatchOnSuccess);
            }
        })
        .catch(error => {
            console.log("post error");
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
    console.log(`get ${url}`);
    axios.get(url, requestConfig)
        .then(response => {
            console.log("get ok");
            payload.data = response.data;
            dispatch(action.done({
                params: {},
                result: payload
            }))
        })
        .catch(error => {
            console.log("get error");
            dispatch(action.failed({params: {}, error: error}));
        });
}
