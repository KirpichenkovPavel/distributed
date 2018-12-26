import {ApplicationState} from "../interfaces/reducers";
import {combineReducers} from "redux";
import {defaultStorage, storageReducer} from "./storageReducer";
import {defaultUserInfo, userReducer} from "./userReducer";
import {componentListReducer, defaultComponentList} from "./componentListReducer";
import {defaultNewOrderState, newOrderReducer} from "./newOrderReducer";
import {createdOrdersReducer, defaultCreatedOrdersState} from "./createdOrdersReducer";
import {defaultOrderDetail, orderDetailReducer} from "./orderDetailReducer";

export const initialState: ApplicationState = {
    storage: defaultStorage,
    user: defaultUserInfo,
    componentList: defaultComponentList,
    newOrder: defaultNewOrderState,
    createdOrders: defaultCreatedOrdersState,
    orderDetail: defaultOrderDetail,

};

export const combinedReducer = combineReducers({
    storage: storageReducer,
    user: userReducer,
    componentList: componentListReducer,
    newOrder: newOrderReducer,
    createdOrders: createdOrdersReducer,
    orderDetail: orderDetailReducer,
});
