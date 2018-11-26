import {MenuSection, Page, Role, StorageItem} from "./data";
import {ApplicationState, StorageState} from "./reducers";

export interface ItemListProps {
    storage: StorageState
}

export interface ItemListCallbacks {
    onMount: () => void
    onStoragePick: (storageId: number) => void
    onAddItem: () => void
    onSelectComponent: (name: string) => void
    onSetItemPrice: (price: number) => void
    onSetItemAmount: (amount: number) => void
}

export interface ItemListState {
    showModal: boolean
}

export interface RootProps {
    fullStateForDebug: ApplicationState
    storageId: number
    activeRoles: Array<Role>
    currentPage: Page
}

export interface RootCallbacks {
    onNextPage: (next: Page) => void
}

export interface MenuProps {
    sections: Array<MenuSection>
    nextPage: (next: Page) => void
}
