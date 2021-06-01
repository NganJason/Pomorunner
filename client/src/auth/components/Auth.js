import { useEffect, useCallback } from "react";

import { cookiesUtil } from "../cookies.js";
import { getService } from "../../services/service.js";
import { loadGoogleScript, onGoogleScriptLoad } from "../googleAuth.js";
import { taskActions } from "../../redux/Tasks/taskActions.js"
import { userActions } from "../../redux/User/userActions.js"

export default function Auth({ auth, setAuth }) {
  const loginHandler = useCallback(async () => {
    const googleResponse = await auth.signIn();

    const userRes = await getService().localService.user.login(googleResponse.qc.id_token)
    cookiesUtil.setAuthCookies(userRes.data.token);
    userActions.setUser(userRes.data.user);
    
    const task = await getService().localService.user.getTasks(userRes.data.user._id);
    taskActions.setTasks(task.data)  
  }, [auth]);

  useEffect(() => {
    window.onGoogleScriptLoad = onGoogleScriptLoad(setAuth);
    loadGoogleScript();
  }, [setAuth]);

  useEffect(() => {
    if (auth) {
      const isSignedIn = auth.isSignedIn.he;

      if (!isSignedIn || !cookiesUtil.getAuthCookies()) {
        console.log("cookies", cookiesUtil.getAuthCookies())
        loginHandler();
      }
    }
  }, [auth, loginHandler]);

  return <></>;
}
