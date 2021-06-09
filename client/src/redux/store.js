import { combineReducers, createStore, applyMiddleware } from "redux";
import { createStateSyncMiddleware } from "redux-state-sync";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStateSyncMiddleware } from "redux-state-sync";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

import taskReducer from "./Tasks/taskReducer.js";
import userReducer from "./User/userReducer.js";

const reduxStateSyncConfig = {
  blacklist: ["persist/PERSIST", "persist/REHYDRATE"],
};

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  tasks: taskReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  composeWithDevTools(
    applyMiddleware(
      ...middleware,
      createStateSyncMiddleware(reduxStateSyncConfig)
    )
  )
);

const persistor = persistStore(store);

export { store, persistor };
