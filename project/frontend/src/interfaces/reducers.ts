import {
    AutocompleteRdxState,
    Component,
    LoginInfo, Order,
    Page,
    Role,
    Storage,
    StorageItem,
    StorageItemSelection
} from "./data";

export interface ApplicationState {
    storage: StorageState
    user: UserInfo
    componentList: ComponentListRxState
    newOrder: NewOrderRxState
    createdOrders: CreatedOrdersRxState

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
    page: number
    last: number
    components: Array<Component>
    newComponent: Component
}

export interface NewOrderRxState {
    selectedStorageId: number
    storages: Array<Storage>
    items: Array<StorageItem>
    selectedItems: Array<StorageItem & StorageItemSelection>
}

export interface CreatedOrdersRxState {
    orders: Array<Order>
    page: number
    last: number
    statusFilter: string
}