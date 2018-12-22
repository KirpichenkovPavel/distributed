export interface StorageItem {
    name: string
    amount: number
    price: number
}

export type Role = 'provider' | 'client' | 'manager';
export type Page =
    'storageDetail' |
    'componentList' |
    'newManagerOrder' |
    'newClientOrder' |
    'orderListManager' |
    'orderListClient' |
    'none';

export interface MenuItem {
    name: string,
    page: Page
}

export interface MenuSection {
    name: string,
    items: Array<MenuItem>
}

export interface Storage {
    id: number
    name: String
}

export interface AutocompleteRdxState<OptionType> {
    options: Array<OptionType>
    page: number
}

export interface Component {
    name: string
    description: string
}

export interface LoginInfo {
    signInActive: boolean
    registerActive: boolean
    nameInput: string
}

export interface StorageItemSelection {
    selectedAmount: number
}

export interface PaginatedComponentList {
    data: Array<Component>
    page: number
    last: number
}

export interface Order {
    id: number
    created: string
    status: string
}
