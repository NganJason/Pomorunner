import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useState } from "react";

import Auth from "./auth/components/Auth.js";
import TaskList from "../src/components/TaskList/TaskList.js";
import SubTaskList from "../src/components/SubTaskList/SubTaskList.js";
import Countdown from "../src/components/Countdown/Countdown.js";
import Grid from "@material-ui/core/Grid";

import "./App.modules.css";
import dotenv from "dotenv";
import { store, persistor } from "./redux/store.js";

dotenv.config();

function App() {
  const [auth, setAuth] = useState()

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Auth auth={auth} setAuth={setAuth} />
          <Countdown />
          <Grid container>
            <Grid item xs={4}>
            </Grid>
            <Grid item xs={4}>
              <TaskList/>
            </Grid>
            <Grid item xs={4}>
              <SubTaskList/>
            </Grid>
          </Grid>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
