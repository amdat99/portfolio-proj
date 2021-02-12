import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import {persistor,store} from './redux/store'

import MessageProvider from './providers/message/message.provider'


ReactDOM.render(
<Provider store={store}>
        <MessageProvider>
    <BrowserRouter>
    <PersistGate persistor= {persistor}>
            <App />
            </PersistGate>
 
    </BrowserRouter> 
    </MessageProvider>

    </Provider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();
reportWebVitals();
