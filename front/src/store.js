import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";

import appReducer from "./appReducer";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

const persistor = persistStore(store);

export { store, persistor };
