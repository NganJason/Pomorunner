import './App.css';
import TaskList from "../src/components/TaskList/TaskList.js";

import axios from "axios";
import GoogleLogin from "react-google-login";

const responseGoogle = async (response) => {
  console.log(response.getBasicProfile())
  const res = await axios({
    method:"POST",
    url: "http://localhost:5000/api/user/login",
    data: {tokenID: response.tokenID}
  })

  console.log(res)
};

function App() {
  return (
    <div className="App">
      <GoogleLogin
        clientId="491275267203-eej320jk3agt6bf01ii5pfonbi3seu1h.apps.googleusercontent.com"
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
