import { useEffect, useCallback, useState } from "react";

import { cookiesUtil } from "../cookies.js";
import { getService } from "../../services/service.js";
import { googleOAuth } from "../googleAuth.js";
import { userActions } from "../../redux/User/userActions.js"

export default function DevAuth() {
  const [auth, setAuth] = useState();

  const loginHandler = useCallback(async () => {
    const googleResponse = await auth.signIn();

    const userRes = await getService().localService.user.login(googleResponse.qc.id_token)

    cookiesUtil.setAuthCookies(userRes.data.token);
    userActions.setUser(userRes.data.user);
  }, [auth]);

  useEffect(() => {
    window.onGoogleScriptLoad = googleOAuth.onGoogleScriptLoad(setAuth);
    googleOAuth.loadGoogleScript();
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
