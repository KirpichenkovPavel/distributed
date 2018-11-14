import * as React from 'react';
import {render} from 'react-dom';
import {applyMiddleware, createStore} from "redux";
import {initialState, mainReducer} from "./reducers/mainReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import RootContainer from "./containers/RootContainer";

document.addEventListener('attach-react', function () {
    const root = document.getElementById('react-root');
    const store = createStore(mainReducer, initialState, applyMiddleware(thunk));
    render(<Provider store={store}>
            <RootContainer/>
        </Provider>,
        root
    );
});