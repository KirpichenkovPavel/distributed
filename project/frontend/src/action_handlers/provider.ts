import {StorageState} from "../interfaces/reducers";

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