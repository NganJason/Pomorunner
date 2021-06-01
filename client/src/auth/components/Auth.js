import axios from "axios";
import { useEffect, useCallback } from "react";

import { cookiesUtil } from "../cookies.js";
import { loadGoogleScript, onGoogleScriptLoad } from "../googleAuth.js";
import { userActions } from "../../redux/User/userActions.js"

let devURL = "http://localhost:5000/";
let liveURL = "https://pomorunner.herokuapp.com/";

export default function Auth({ auth, setAuth }) {
  const loginHandler = useCallback(async () => {
    const googleResponse = await auth.signIn();

    const userRes = await axios({
      method: "POST",
      url: `${liveURL}api/user/login`,
      withCredentials: true,
      data: { tokenId: googleResponse.qc.id_token },
    });

    cookiesUtil.setAuthCookies(userRes.data.token);
    userActions.setUser(userRes.data.user);
  }, [auth]);

  useEffect(() => {
    window.onGoogleScriptLoad = onGoogleScriptLoad(setAuth);
    loadGoogleScript();
  }, [setAuth]);

  useEffect(() => {
    if (auth) {
      const isSignedIn = auth.isSignedIn.he;

      if (!isSignedIn || !cookiesUtil.getAuthCookies()) {
        loginHandler();
      }
    }
  }, [auth, loginHandler]);

  return <></>;
}
