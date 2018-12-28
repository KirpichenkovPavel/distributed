import {Component, LoginInfo, MenuSection, Order, Page, Payment, Role, Storage, StorageItem} from "./data";
import {ApplicationState, StorageState} from "./reducers";
import {TypeaheadProps} from "react-bootstrap-typeahead";

export interface ItemListProps {
    storage: StorageState
    readOnly: boolean
}

export interface ItemListCallbacks {
    onMount: () => void
    onStoragePick: (storageId: number) => void
    onAddItem: () => void
    onSelectComponent: (name: string) => void
    onSetItemPrice: (price: number) => void
    onSetItemAmount: (amount: number) => void
    onComponentSearch: (text: string) => void
}

export interface ItemListState {
    showModal: boolean
}

export interface RootProps {
    fullStateForDebug: ApplicationState
    storageId: number
    activeUser: string
    activeRoles: Array<Role>
    currentPage: Page
    loginInfo: LoginInfo
}

export interface RootCallbacks {
    onNextPage: (next: Page) => void
    onModalOpen: (signIn: boolean) => void
    onModalClose: () => void
    onModalInputChange: (newText: string) => void
    onModalConfirm: () => void
    onLogout: () => void
}

export interface MenuProps {
    sections: Array<MenuSection>
    userName: string
    loginInfo: LoginInfo
    nextPage: (next: Page) => void
    modalOpen: (signIn: boolean) => void
    modalClose: () => void
    modalInputChange: (newText: string) => void
    modalConfirm: () => void
    logout: () => void
}

export interface AutocompleteProps<OptionType> {
    options: Array<OptionType>
    onSelect: (selected: Array<OptionType>) => void
    onInputChange?: (newText: string) => void
    additionalProps?: Partial<TypeaheadProps<OptionType>>
}

export interface AutocompleteState<OptionType> {
}

export interface ComponentListProps {
    components: Array<Component>
    newComponent: Component
    page: number
    last: number
}

export interface ComponentListCallbacks {
    onComponentListUpdateNeeded: () => void
    onUpdateNewComponentName: (name: string) => void
    onUpdateNewComponentDescription: (description: string) => void
    onAddComponent: () => void
    onPageChange: (page: number) => void
}

export interface ComponentListState {
    showModal: boolean
}

export interface NewOrderProps {
    selectedStorageId: number
    storages: Array<Storage>
    availableItems: Array<StorageItem>
    selectedItems: Array<StorageItem>
}

export interface NewOrderCallbacks {
    onMount: () => void
    onSelectStorage: (id: number) => void
    onChangeItemSelection: (name: string, newAmount: number, inSelected: boolean) => void
    onAddToSelected: (name: string) => void
    onSaveNewOrder: () => void
}

export interface ItemsTableProps {
    items: Array<StorageItem>
    className?: string
    additionalColumns?: Array<TableColumn>
}

export interface TableColumn {
    className: string
    text: string
    cellRenderer: (
        item: StorageItem,
        rowIx: number,
        columnIx: number,
    ) => JSX.Element
}

export interface OrderListProps {
    orders: Array<Order>
    page: number
    last: number
    status: string
}

export interface OrderListCallbacks {
    fetchOrders: () => void
    changePage: (page: number) => void
    changeStatusFilter: (status: string) => void
    toOrderDetail: (id: number) => void
}

export interface TableProps<TableItem> {
    className?: string
    columns: Array<GenericTableColumn<TableItem>>
    data: Array<TableItem>
}

export interface GenericTableColumn<TableItem> {
    className?: string
    text: string
    cellRenderer: (
        item: TableItem,
        rowIx: number,
        columnIx: number,
    ) => JSX.Element
}

export interface OrderDetailProps {
    id: number
    from: string
    to: string
    items: Array<StorageItem>
    status: string
    created: string
    payment: Payment
    storage: Storage
    loaded: boolean
    showProceedButton: boolean
    showCancelButton: boolean
    showPaymentButton: boolean
    showStorageSelector: boolean
    ownedStorages: Array<Storage>
    selectedTargetStorage: number
}

export interface OrderDetailCallbacks {
    loadDetail: () => void
    process: () => void
    cancel: () => void
    purchase: () => void
    selectTargetStorage: (id: number) => void
}