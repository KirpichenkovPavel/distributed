import actionCreatorFactory from 'typescript-fsa';
import {Component, Page, StorageItem} from "./interfaces/data";

const actionCreator = actionCreatorFactory();

export const LoadStorageItems = actionCreator.async<
    {},
    {data: Array<StorageItem>},
    {data: any}>('LOAD_STORAGE_ITEMS');
export const ChangePage = actionCreator<{next: Page}>('CHANGE_PAGE');
export const LoadStorages = actionCreator.async<
    {},
    {data: any},
    {data: any}>('LOAD_STORAGES');
export const SetStorage = actionCreator<{id: number}>('SET_STORAGE');
export const UpdateNewStorageItem = actionCreator<{
    name?: string,
    amount?: number,
    price?: number}>('UPDATE_NEW_STORAGE_ITEM');
export const StorageAutocompleteComponentsRequest = actionCreator.async<
    {},
    {data: Array<Component>},
    {data: any}>('COMPONENTS_REQUEST');
export const CreateNewItemInStorage = actionCreator.async<
    {},
    {},
    {data: any}>('CREATE_NEW_ITEM');
export const LoadComponentsList = actionCreator.async<
    {},
    {data: Array<Component>},
    {data: any}>("LOAD_COMPONENTS_LIST");
export const UpdateNewComponent = actionCreator<{
    name?: string,
    description?: string
}>("UPDATE_NEW_COMPONENT");
export const CreateNewComponent = actionCreator.async<
    {},
    {},
    {data: any}>('CREATE_NEW_COMPONENT');
export const OpenLoginModal = actionCreator<{signIn: boolean}>("OPEN_LOGIN_MODAL");
export const CloseLoginModal = actionCreator<{}>("CLOSE_LOGIN_MODAL");
export const ChangeUserNameInput = actionCreator<{newText: string}>("CHANGE_USER_NAME_INPUT");
export const UserModalConfirmRequest = actionCreator.async<
    {name: string},
    any,
    {data: any}>("LOGIN_REQUEST");
export const Logout = actionCreator<{}>("LOGOUT");
export const NewOrderStoragesRequest = actionCreator.async<{}, any, any>("NEW_ORDER_STORAGES");
export const SetNewOrderStorage = actionCreator<{storageId: number}>("SET_NEW_ORDER_STORAGE");
export const NewOrderStorageItemsRequest = actionCreator.async<
    {},
    {data: Array<StorageItem>},
    {data: any}>("NEW_ORDER_STORAGE_ITEMS");