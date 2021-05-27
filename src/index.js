import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'tachyons';
import reportWebVitals from './reportWebVitals';

import {Provider} from "react-redux";
import {createStore, applyMiddleware, combineReducers} from "redux";
import {createLogger} from "redux-logger/src";
import thunkMiddleware from 'redux-thunk'
import {
    getUrlFromInput,
    inputToUrl,
    getBoxes,
    changeRoute,
    getIfSignedIn,
    getUser,
    getSignInDataEmail,
    getSignInDataPassword,
    getSignInDataForSubmit,
    getRegisterName,
    getRegisterEmail,
    getRegisterPassword,
    getRegisterError,
    getRegisterDataForSubmit
} from "./reducers";

const logger = createLogger()
const rootReducer = combineReducers({
    getUrlFromInput,
    inputToUrl,
    getBoxes,
    changeRoute,
    getIfSignedIn,
    getUser,
    getSignInDataEmail,
    getSignInDataPassword,
    getSignInDataForSubmit,
    getRegisterName,
    getRegisterEmail,
    getRegisterPassword,
    getRegisterError,
    getRegisterDataForSubmit
})
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
