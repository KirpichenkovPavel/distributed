import {AnyAction} from "typescript-fsa";
import {ThunkDispatch} from "redux-thunk";
import {ApplicationState} from "../interfaces/reducers";
import {getRequest} from "../containers/requests";
import {LoadStorageItems} from "../actions";

export function storageItemsRequest(
    dispatch: ThunkDispatch<ApplicationState, any, AnyAction>,
    getState: () => ApplicationState
) {
    const state = getState();
    const url = `http://localhost:8080/storage/${state.selectedStorageId}/items`;
    getRequest(dispatch, LoadStorageItems, url);
}