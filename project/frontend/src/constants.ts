import {MenuSection, Role} from "./interfaces/data";

export const menuForRoles: Map<Role, Array<MenuSection>> = new Map<Role, Array<MenuSection>>([
    ['provider', [{
        name: 'Provider',
        items: [
            {
                name: 'Storages',
                page: 'storageDetail'
            }
        ]
    }]],
    ['user', []],
    ['manager', []],
]);