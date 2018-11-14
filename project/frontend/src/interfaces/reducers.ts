import {StorageItem} from "./data";

export interface ApplicationState {
    storage: Storage
}

export interface Storage {
    selectedStorageId: number
    storageItems: Array<StorageItem>
}