import { store } from "../store";
import { userConst } from "./userConst.js"

const setUser = (payload) => {
    store.dispatch({ type: userConst.SET_USER, payload: payload })
}

const deleteUser = () => {
    store.dispatch({ type: userConst.DELETE_USER })
}

export const userActions = {
    setUser,
    deleteUser
}