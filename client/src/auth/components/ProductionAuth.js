import { useEffect, useState } from "react"

import { getService } from "../../services/service.js"
import { googleOAuth } from "../googleAuth.js"
import { userActions } from "../../redux/User/userActions.js"
import { store } from "../../redux/store.js"

export default function ProductionAuth({setLoading}) {
    const [authToken, setAuthToken] = useState()
    
    useEffect(async () => {
      const isAuthRes = await getService().localService.user.checkAuth();
      const user = store.getState().user

      if (isAuthRes.data.isAuth && user._id) {
        setLoading(false)
      } else {
        googleOAuth.launchGoogleAuthFlow(setAuthToken);
      }
    }, [])

    useEffect(async () => {
      if (authToken) {
        const userRes = await getService().localService.user.login(authToken);
        userActions.setUser(userRes.data.user);

        setLoading(false)
      }
    }, [authToken]);

    return <></>
}