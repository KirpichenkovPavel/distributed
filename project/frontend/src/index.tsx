import * as React from 'react';
import ReactDom, {render} from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import RootContainer from "./containers/RootContainer";
import {initialState, combinedReducer} from "./reducers/mainReducer";

document.addEventListener('attach-react', function () {
    const root = document.getElementById('react-root');
    const state = JSON.parse(sessionStorage.getItem('state')) || initialState;
    const store = createStore(combinedReducer, state, applyMiddleware(thunk));
    store.subscribe(() => {
        sessionStorage.setItem('state', JSON.stringify(store.getState()));
    });
    render(<Provider store={store}>
            <RootContainer/>
        </Provider>,
        root
    );
});
