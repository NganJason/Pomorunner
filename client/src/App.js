import dotenv from "dotenv";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

import DevAuth from "./auth/components/DevAuth.js";
import Fade from "@material-ui/core/Fade";
import ProductionAuth from "./auth/components/ProductionAuth.js";
import TaskList from "../src/components/TaskList/TaskList.js";
import SubTaskList from "../src/components/SubTaskList/SubTaskList.js";
import Countdown from "../src/components/Countdown/Countdown.js";
import Grid from "@material-ui/core/Grid";

import "./App.modules.css";
import { getService } from "./services/service.js";
import { store, persistor } from "./redux/store.js";
import {useWindowDimensions} from "./hooks/useWindowDimensions.js"
import {imgUtils} from "./utils/imgUtils.js"

dotenv.config();

function App() {
  const [loading, setLoading] = React.useState(true)
  const [img, setImg] = React.useState("")
  const {width, height} = useWindowDimensions();

  React.useEffect(() => {
    getService();
    console.log("Init services")
  }, []);

  React.useEffect(() => {
    const getImg = async() => {
      let image = await imgUtils.getBackgroundImg(width, height);
      setImg(image);
    }

    getImg()
  })

  return (
    <div className="default-background">
      <Fade in={!loading} timeout={{ enter: 3000, exit: 1000 }}>
        <img src={img} alt="background" className="background-img" />
      </Fade>
      <div className="main-content">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Fade in={!loading} timeout={{ enter: 500 }}>
              <div className="App">
                {process.env.NODE_ENV === "development" ? (
                  <DevAuth setLoading={setLoading} />
                ) : (
                  <ProductionAuth setLoading={setLoading} />
                )}
                <Countdown />
                <Grid container>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={4}>
                    <TaskList />
                  </Grid>
                  <Grid item xs={4}>
                    <SubTaskList />
                  </Grid>
                </Grid>
              </div>
            </Fade>
          </PersistGate>
        </Provider>
      </div>
    </div>
  );
}

export default App;
