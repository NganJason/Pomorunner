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
import Quote from "./components/Quote/Quote.js"

import "./App.modules.css";
import { getService } from "./services/service.js";
import { store, persistor } from "./redux/store.js";
import {quotesUtils} from "./utils/quotesUtils.js"

dotenv.config();

function App() {
  const [loading, setLoading] = React.useState(true)
  const [quote, setQuote] = React.useState({text:"", author: ""})

  React.useEffect(() => {
    getService();
    console.log("Init services")
    
    const setRandomQuote = async () => {
      setQuote(await(quotesUtils.getRandomQuote()))
    }

    setRandomQuote()
  }, []);

  return (
    <div className="default-background">
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
              <Fade in={!loading} timeout={{enter: 3000, exit: 1000}}>
                <Quote text={quote.text}/>
              </Fade>
            </div>
          </Fade>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
