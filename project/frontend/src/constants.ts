import {MenuSection, Role, StatusInfo} from "./interfaces/data";

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
            },
            {
                name: 'Orders from managers',
                page: 'orderListProvider'
            },
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
                page: 'orderListMy',
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
                name: 'My orders to providers',
                page: 'orderListMy',
            },
            {
                name: 'Orders from clients',
                page: 'orderListManager',
            },
            {
                name: 'Storages',
                page: 'storageDetailManager'
            },
        ]
    }]],
]);

export const orderStatusInfoByStatusName = new Map<string, StatusInfo>([
    ["any", {
        displayName: "Any",
        status: "any",
        next: ""
    }],
    ["new", {
        displayName: "New",
        status: "new",
        next: "Submit"
    }],
    ["submitted", {
        displayName: "Submitted",
        status: "submitted",
        next: "Approve"
    }],
    ["approved", {
        displayName: "Can be paid",
        status: "approved",
        next: ""
    }],
    ["paid", {
        displayName: "Paid",
        status: "paid",
        next: "Mark finished"
    }],
    ["complete", {
        displayName: "Done",
        status: "complete",
        next: "Confirm"
    }],
    ["closed", {
        displayName: "Closed",
        status: "closed",
        next: ""
    }],
    ["cancelled", {
        displayName: "Cancelled",
        status: "cancelled",
        next: ""
    }],
]);

export const creatorProceedStatuses = ["new", "complete"];
export const executorProceedStatuses = ["submitted", "paid"];
export const creatorCancelStatuses = ["new", "submitted", "approved", "paid", "complete"];
export const executorCancelStatuses = ["submitted", "approved", "paid", "complete"];