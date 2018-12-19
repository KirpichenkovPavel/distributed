import {Action, Failure} from "typescript-fsa";
import {ComponentListRxState, NewOrderRxState, StorageState, UserInfo} from "../interfaces/reducers";
import {Component, Storage, StorageItem, StorageItemSelection} from "../interfaces/data";
import {ObjectHTMLAttributes} from "react";
import {array, object} from "prop-types";

export function logRequestFailure(state, action: Action<Failure<{}, { data: any }>>) {
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

export function handleComponentListLoaded(state: ComponentListRxState, newItems: Array<Component>): ComponentListRxState {
    return Object.assign({}, state, {components: newItems});
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
    console.log(result);
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
    const newSelectedItems = state.selectedItems.map((item: StorageItem & StorageItemSelection) => {
        if (item.name === name) {
            item.amount = item.selectedAmount + item.amount;
            item.selectedAmount = 0;
        }
        return item;
    });
    return Object.assign({}, state, {selectedItems: newSelectedItems});
}
