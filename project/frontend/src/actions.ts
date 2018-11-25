import actionCreatorFactory from 'typescript-fsa';
import {Page, StorageItem} from "./interfaces/data";

const actionCreator = actionCreatorFactory();

export const LoadStorageItems = actionCreator.async<
    {},
    {data: any},
    {data: Array<StorageItem>}>('LOAD_STORAGE_ITEMS');
export const ChangePage = actionCreator<{next: Page}>('CHANGE_PAGE');
export const LoadStorages = actionCreator.async<
    {},
    {data: any},
    {data: any}>('LOAD_STORAGES');
export const SetStorage = actionCreator<{id: number}>('SET_STORAGE');

