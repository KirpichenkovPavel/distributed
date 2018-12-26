import {MenuSection, Role} from "./interfaces/data";

export const menuForRoles: Map<Role, Array<MenuSection>> = new Map<Role, Array<MenuSection>>([
    ['provider', [{
        name: 'Provider',
        items: [
            {
                name: 'Storages',
                page: 'storageDetail'
            },
            {
                name: 'Components',
                page: 'componentList'
            }
        ]
    }]],
    ['client', [{
        name: 'Client',
        items: [
            {
                name: 'Components',
                page: 'componentList'
            },
            {
                name: 'New order',
                page: 'newClientOrder'
            },
            {
                name: 'My orders',
                page: 'orderListClient',
            }
        ]
    }]],
    ['manager', [{
        name: 'Manager',
        items: [
            {
                name: 'Components',
                page: 'componentList'
            },
            {
                name: 'New order',
                page: 'newManagerOrder'
            },
            {
                name: 'Orders to providers',
                page: 'orderListManager',
            }
        ]
    }]],
]);

export const orderStatusToDisplayName = new Map<string, string>([
    ["any", "Any"],
    ["new", "New"],
    ["submitted", "Submitted"],
    ["approved", "Can be paid"],
    ["paid", "Paid"],
    ["complete", "Done"],
    ["closed", "Closed"],
    ["cancelled", "Cancelled"],
]);
