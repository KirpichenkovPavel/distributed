import {ComponentListRxState, StorageState} from "../interfaces/reducers";

export function updateNewStorageItem(
    state: StorageState,
    name?: string,
    amount?: number,
    price?: number): StorageState
{
    const newName = name === undefined ? state.newItem.name : name;
    const newAmount = amount === undefined ? state.newItem.amount : amount;
    const newPrice = price === undefined ? state.newItem.price : price;
    return Object.assign({}, state, {
        newItem: {
            name: newName,
            amount: newAmount,
            price: newPrice
        }
    });
}

export function updateNewComponent(state: ComponentListRxState, name?: string, description?: string) {
    const newName = name === undefined ? state.newComponent.name : name;
    const newDescription = description === undefined ? state.newComponent.description : description;
    return Object.assign({}, state, {
        newComponent: {
            name: newName,
            description: newDescription
        }
    });
}