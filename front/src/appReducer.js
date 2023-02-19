import { combineReducers } from "redux";
import reducerload  from "./actions/reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "ry-auth",
  storage,
};

const reducer = combineReducers({
  load: reducerload,
});
/*const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);*/
export default persistReducer(persistConfig, reducer);
