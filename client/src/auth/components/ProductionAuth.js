import { useEffect, useState } from "react"

import { getService } from "../../services/service.js"
import { googleOAuth } from "../googleAuth.js"
import { userActions } from "../../redux/User/userActions.js"

export default function ProductionAuth({setLoading}) {
    const [authToken, setAuthToken] = useState()
    
    useEffect(() => {
        const isAuthRes = getService().localService.user.checkAuth()

        if (isAuthRes.data.isAuth) {
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