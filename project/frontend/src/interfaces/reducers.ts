import {AutocompleteRdxState, Page, Role, Storage, StorageItem} from "./data";

export interface ApplicationState {
    storage: StorageState,
    user: UserInfo
}

export interface StorageState {
    selectedStorageId: number
    storageItems: Array<StorageItem>
    allStorages: Array<Storage>
    newItem: StorageItem
    componentAutocomplete: AutocompleteRdxState<string>
}

export interface UserInfo {
    roles: Array<Role>
    activePage: Page
}
