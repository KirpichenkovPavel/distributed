import {AutocompleteRdxState, Component, LoginInfo, Page, Role, Storage, StorageItem} from "./data";

export interface ApplicationState {
    storage: StorageState,
    user: UserInfo,
    componentList: ComponentListRxState,
    newOrder: NewOrderRxState
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
    userName: string
    login: LoginInfo
}

export interface ComponentListRxState {
    components: Array<Component>
    newComponent: Component
}

export interface NewOrderRxState {
    selectedStorageId: number
    storages: Array<Storage>
    items: Array<StorageItem>
    selectedItems: Array<StorageItem>
}
