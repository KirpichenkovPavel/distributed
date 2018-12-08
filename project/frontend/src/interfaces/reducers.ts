import {AutocompleteRdxState, Component, LoginInfo, Page, Role, Storage, StorageItem} from "./data";

export interface ApplicationState {
    storage: StorageState,
    user: UserInfo,
    componentList: ComponentListRxState
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