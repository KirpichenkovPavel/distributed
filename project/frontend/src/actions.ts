import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

export const LoadStorageItems = actionCreator.async<
    {},
    {data: any},
    {data: any}>("GET_STORAGE_ITEMS");
