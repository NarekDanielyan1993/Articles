import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import Immutable from "immutable";
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import {BrowserRouter} from "react-router-dom";

import postReducer from "../src/store/reducers/postReducer";

import App from "./App";

const rootReducer = combineReducers({
    post: postReducer
})

const composeEnhancers = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' ?
window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    serialize: {
        immutable: Immutable
    }
}) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>    
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>, document.getElementById('root'));