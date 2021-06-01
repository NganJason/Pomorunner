import { userConst } from "./userConst.js"

const initialState = {}

export default function userReducer(state=initialState, action) {
    switch(action.type) {
        case userConst.SET_USER: {
            return {
                ...action.payload
            }
        }

        case userConst.DELETE_USER: {
            return {}
        }

        default: {
            return state
        }
    }
}