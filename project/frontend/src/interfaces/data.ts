export interface StorageItem {
    name: string
    amount: number
    price: number
}

export type Role = 'provider' | 'user' | 'manager';
export type Page = 'storageDetail' | 'none';

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
