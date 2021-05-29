import { useState } from "react"

import './App.css';
import TaskList from "../src/components/TaskList/TaskList.js";
import dotenv from "dotenv";
import Auth from "./auth/components/Auth.js"
dotenv.config();

function App() {
  const [auth, setAuth] = useState()

  return (
    <div className="App">
    <Auth auth={auth} setAuth={setAuth}/>
      <TaskList />
    </div>
  );
}

export default App;
