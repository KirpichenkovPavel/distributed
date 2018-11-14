import {StorageItem} from "./data";
import {ApplicationState} from "./reducers";

export interface ItemListProps {
    items: Array<StorageItem>
}

export interface ItemListCallbacks {

}

export interface ItemListState {

}

export interface RootProps {
    storageId: number
    fullStateForDebug: ApplicationState
}

export interface RootCallbacks {
    onUpdate: () => void
}