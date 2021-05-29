import axios from "axios";
import { useEffect } from "react";

import { loadGoogleScript, onGoogleScriptLoad } from "../googleAuth.js";
import { cookiesUtil } from "../cookies.js";

let devURL = "http://localhost:5000/";
let liveURL = "https://pomorunner.herokuapp.com/";

export default function Auth({ auth, setAuth }) {
  const loginHandler = async () => {
    const googleResponse = await auth.signIn();

    const res = await axios({
      method: "POST",
      url: `${liveURL}api/user/login`,
      withCredentials: true,
      data: { tokenId: googleResponse.qc.id_token },
    });

    cookiesUtil.setAuthCookies(res.data.token);
  };

  useEffect(() => {
    window.onGoogleScriptLoad = onGoogleScriptLoad(setAuth);
    loadGoogleScript();
  }, []);

  useEffect(() => {
    if (auth) {
      const isSignedIn = auth.isSignedIn.he;

      if (!isSignedIn || !cookiesUtil.getAuthCookies()) {
        loginHandler();
      }
    }
  }, [auth]);

  return <></>;
}
