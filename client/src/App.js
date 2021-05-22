import './App.css';
import TaskList from "../src/components/TaskList/TaskList.js";

import axios from "axios";
import dotenv from "dotenv";
import GoogleLogin from "react-google-login";

dotenv.config();

const responseGoogle = async (response) => {
  const res = await axios({
    method:"POST",
    url: "http://localhost:5000/api/user/login",
    withCredentials: true,
    data: {tokenId: response.tokenId}
  })
};

function App() {
  return (
    <div className="App">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        cookiePolicy={"single_host_origin"}
      />
      <TaskList />
    </div>
  );
}

export default App;
