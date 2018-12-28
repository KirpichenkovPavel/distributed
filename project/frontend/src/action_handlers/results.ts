import {Action, Failure} from "typescript-fsa";
import {
    ComponentListRxState,
    CreatedOrdersRxState,
    NewOrderRxState, OrderDetailRxState,
    StorageState,
    UserInfo
} from "../interfaces/reducers";
import {
    Component,
    DetailedOrder,
    Order,
    PaginatedComponentList,
    Storage,
    StorageItem,
    StorageItemSelection
} from "../interfaces/data";
import {ObjectHTMLAttributes} from "react";
import {array, object} from "prop-types";
import {ComponentListState} from "../interfaces/components";

export function logRequestFailure(state, action: Action<Failure<any, any>>) {
    const error = action.payload.error;
    console.error(error);
    return state;
}

export function handleStoragesUpdate(state: StorageState, storages: Array<Storage>): StorageState {
    return Object.assign({}, state, {allStorages: storages});
}

export function handleStorageItemsUpdate(state: StorageState, newItems: Array<StorageItem>): StorageState {
    return Object.assign({}, state, {storageItems: newItems});
}

export function handleComponentListLoaded(state: ComponentListRxState, newItems: PaginatedComponentList): ComponentListRxState {
    return Object.assign({}, state, {
        components: newItems.data,
        last: newItems.last,
        page: newItems.page,
    });
}

export function handleLoginModalOpen(state: UserInfo, signIn: boolean): UserInfo {
    return Object.assign({}, state, {
        login: {
            nameInput: state.login.nameInput,
            signInActive: signIn,
            registerActive: !signIn,
        }
    });
}

export function handleLoginModalClose(state: UserInfo): UserInfo {
    return Object.assign({}, state, {
        login: {
            nameInput: "",
            registerActive: false,
            signInActive: false,
        }
    });
}

export function handleLoginModalInputTextChange(state: UserInfo, newText: string): UserInfo {
    return Object.assign({}, state, {
        login: {
            nameInput: newText,
            signInActive: state.login.signInActive,
            registerActive: state.login.registerActive,
        }
    });
}

export function handleLoginResults(state: UserInfo, result: { data: any }, userName: string): UserInfo {
    let roles = [];
    if (result.data instanceof Array)
        roles = result.data;
    return Object.assign({}, state, {
        userName: userName,
        roles: roles,
        login: {
            signInActive: false,
            registerActive: false,
            nameInput: ""
        }
    });
}

export function handleLogout(state: UserInfo): UserInfo {
    return Object.assign({}, state, {
        roles: [],
        userName: null,
        activePage: 'none'
    });
}

export function handleNewOrderStoragesUpdate(state: NewOrderRxState, data: Array<Storage>): NewOrderRxState {
    return Object.assign({}, state, {
        storages: data
    });
}

export function handleNewOrderStorageItemsUpdate(state: NewOrderRxState, data: Array<StorageItem>): NewOrderRxState {
    return Object.assign({}, state, {
        items: data
    });
}

export function handleSetnewOrderStorage(state: NewOrderRxState, id: number): NewOrderRxState {
    return Object.assign({}, state, {
        selectedStorageId: id,
    })
}

export function handleNewOrderSelectedItemAmountChange(
    state: NewOrderRxState,
    name: string,
    newAmount: number,
    inSelected: boolean): NewOrderRxState
{
    let found = false;
    const availableItem = state.items.find(item => item.name === name);
    const newSelectedItems = state.selectedItems.map((item: StorageItem & StorageItemSelection) => {
        if (item.name === name) {
            found = true;
            if (inSelected && newAmount <= availableItem.amount)
                item.amount = newAmount;
            else if (newAmount + item.amount <= availableItem.amount)
                item.selectedAmount = newAmount;
        }
        return item;
    });
    if (!found) {
        if (availableItem) {
            newSelectedItems.push({
                name: name,
                amount: 0,
                price: availableItem.price,
                selectedAmount: newAmount,
            });
        }
    }
    return Object.assign({}, state, {selectedItems: newSelectedItems});
}

export function handleAddItemToNewOrderSelection(state: NewOrderRxState, name: string) {
    let found = false;
    const fromAvailable = state.items.find(it => it.name === name);
    const newSelectedItems = state.selectedItems.map((item: StorageItem & StorageItemSelection) => {
        if (item.name === name) {
            found = true;
            const selectedAmount = (item.selectedAmount > 0
                ? item.selectedAmount
                : fromAvailable.amount > item.amount ? 1 : 0
            );
            item.amount = selectedAmount + item.amount;
            item.selectedAmount = 0;
        }
        return item;
    });
    if (!found) {
        if (fromAvailable) {
            newSelectedItems.push({
                name: fromAvailable.name,
                selectedAmount: 0,
                price: fromAvailable.price,
                amount: 1,
            });
        }
    }
    return Object.assign({}, state, {selectedItems: newSelectedItems});
}

export function dropOldOrder(state: NewOrderRxState): NewOrderRxState {
    return Object.assign({}, state, {
        selectedItems: [],
    });
}

export function handleChangeComponentListPage(state: ComponentListRxState, page: number): ComponentListRxState {
    return Object.assign({}, state, {
        page: page
    });
}

export function handleMyOrdersRequestResults(
    state: CreatedOrdersRxState,
    orders: Order[],
    page: number,
    lastPage: number
): CreatedOrdersRxState {
    return Object.assign({}, state, {
        orders: orders,
        page: page,
        last: lastPage
    });
}

export function handleChangeMyOrdersPage(state: CreatedOrdersRxState, page: number): CreatedOrdersRxState {
    return Object.assign({}, state, {page: page});
}

export function handleChangeMyOrdersFilter(state: CreatedOrdersRxState, filter: string): CreatedOrdersRxState {
    return Object.assign({}, state, {
        statusFilter: filter
    });
}

export function handleGoToDetailPage(state: UserInfo): UserInfo {
    return Object.assign({}, state, {
        activePage: "orderDetail"
    });
}

export function handleGoToDetailInfo(state: OrderDetailRxState, id: number): OrderDetailRxState {
    return Object.assign({}, state, {
        id: id
    });
}

export function handleOrderDetailRequest(state: OrderDetailRxState, order: DetailedOrder): OrderDetailRxState {
    return Object.assign({}, state, {
        id: order.id,
        status: order.status,
        created: order.created,
        from: order.from,
        to: order.to,
        storage: order.storage,
        items: order.items,
        loaded: true,
        payment: order.payment
    });
}