import * as React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import RootContainer from "./containers/RootContainer";
import {initialState, combinedReducer} from "./reducers/mainReducer";

document.addEventListener('attach-react', function () {
    const root = document.getElementById('react-root');
    const store = createStore(combinedReducer, initialState, applyMiddleware(thunk));
    render(<Provider store={store}>
            <RootContainer/>
        </Provider>,
        root
    );
});