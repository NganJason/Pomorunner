import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import taskReducer from "./Tasks/taskReducer.js";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
