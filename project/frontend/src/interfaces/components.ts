import {Component, LoginInfo, MenuSection, Page, Role} from "./data";
import {ApplicationState, StorageState} from "./reducers";
import {TypeaheadProps} from "react-bootstrap-typeahead";

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
}

export interface ComponentListCallbacks {
    onMount: () => void
    onUpdateNewComponentName: (name: string) => void
    onUpdateNewComponentDescription: (description: string) => void
    onAddComponent: () => void
}

export interface ComponentListState {
    showModal: boolean
}