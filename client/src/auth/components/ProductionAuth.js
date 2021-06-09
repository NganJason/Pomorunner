import { useEffect, useState } from "react"

import { getService } from "../../services/service.js"
import { googleOAuth } from "../googleAuth.js"
import { userActions } from "../../redux/User/userActions.js"

export default function ProductionAuth() {
    const [authToken, setAuthToken] = useState()
    
    useEffect(() => {
        googleOAuth.launchGoogleAuthFlow(setAuthToken);
    }, [])

    useEffect(async () => {
      const userRes = await getService().localService.user.login(authToken);
      userActions.setUser(userRes.data.user);
    }, [authToken]);

    return <></>
}