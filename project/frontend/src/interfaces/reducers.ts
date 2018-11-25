import {Page, Role, Storage, StorageItem} from "./data";

export interface ApplicationState {
    storage: StorageState,
    user: UserInfo
}

export interface StorageState {
    selectedStorageId: number
    storageItems: Array<StorageItem>
    allStorages: Array<Storage>
}

export interface UserInfo {
    roles: Array<Role>
    activePage: Page
}