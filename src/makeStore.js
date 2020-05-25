import thunk from "redux-thunk";
import Immutable from "immutable";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";

//REDUCERS
import * as indexReducer from "../src/store/reducers/index";


export default function makeStore() {

    const rootReducer = combineReducers({
        post: indexReducer.postReducer
    });

    const composeEnhancers = typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            serialize: {
                immutable: Immutable
            }
        }) : compose;

    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

    if (module.hot) {
        module.hot.accept("./store/reducers", () => {
            const nextRootReducer = require("./store/reducers/index");
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}