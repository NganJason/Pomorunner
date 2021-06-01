import { useEffect, useCallback } from "react";

import { loadGoogleScript, onGoogleScriptLoad } from "../googleAuth.js";
import { cookiesUtil } from "../cookies.js";
import { getService } from "../../services/service.js";
import { taskActions } from "../../redux/Tasks/taskActions.js"

export default function Auth({ auth, setAuth }) {
  const loginHandler = useCallback(async () => {
    const googleResponse = await auth.signIn();

    const res = await getService().localService.user.login(googleResponse.qc.id_token)
    const {_id} = res.data.user

    cookiesUtil.setAuthCookies(res.data.token);
    
    const task = await getService().localService.user.getTasks(_id);
    
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
