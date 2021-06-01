import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

import Auth from "./auth/components/Auth.js";
import TaskList from "../src/components/TaskList/TaskList.js";

import "./App.css";
import dotenv from "dotenv";
import { store, persistor } from "./redux/store.js";
import { getService } from "./services/service.js";

dotenv.config();

function App() {
  const [auth, setAuth] = React.useState()

  React.useEffect(() => {
    const _ = getService()
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Auth auth={auth} setAuth={setAuth} />
          <TaskList />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
