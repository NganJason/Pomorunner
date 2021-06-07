import dotenv from "dotenv";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

import DevAuth from "./auth/components/DevAuth.js";
import ProductionAuth from "./auth/components/ProductionAuth.js";
import TaskList from "../src/components/TaskList/TaskList.js";

import "./App.css";
import { getService } from "./services/service.js";
import { store, persistor } from "./redux/store.js";

dotenv.config();

function App() {
  React.useEffect(() => {
    getService();
    console.log("Init services")
  }, []);


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
        {process.env.NODE_ENV === "development" ? <DevAuth /> : <ProductionAuth />}
          <TaskList />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
