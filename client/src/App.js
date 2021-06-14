import dotenv from "dotenv";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

import DevAuth from "./auth/components/DevAuth.js";
import ProductionAuth from "./auth/components/ProductionAuth.js";
import TaskList from "../src/components/TaskList/TaskList.js";
import SubTaskList from "../src/components/SubTaskList/SubTaskList.js";
import Countdown from "../src/components/Countdown/Countdown.js";
import Grid from "@material-ui/core/Grid";

import "./App.modules.css";
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
          <Countdown />
          <Grid container>
            <Grid item xs={2} sm={3} lg={4}>
            </Grid>
            <Grid item xs={8} sm={6} lg={4}>
              <TaskList/>
            </Grid>
            <Grid item xs={2} sm={3} lg={4}>
              <SubTaskList/>
            </Grid>
          </Grid>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
