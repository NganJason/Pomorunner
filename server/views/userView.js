import {userController} from "../controllers/userController.js"

const loginUser = async (req, res, next) => {
    try {
        let {token, email} = await userController.handleLoginUser(req)
        res.cookie("token", token, {maxAge: 900000, httpOnly: true})
        res.status(200).json(
            {   
                token: token, 
                email: email
            }
        )
    } catch (err) {
        next(err)
    }
}

const logoutUser = async (req, res, next) => {
    try {
        userController.handleLogoutUser(req, res)
        res.status(200).json({message: "Logged out successfully"})
    } catch (err) {
        next(err)
    }
}

const createUser = async (req, res, next) => {
    try {
        let resp = await userController.handleCreateUser(req)
        res.status(200).json(resp)
    } catch (err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
    try {
        let resp = await userController.handleGetUser(req)
        res.status(200).json(resp)
    } catch (err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        let resp = await userController.handleUpdateUser(req)
        res.status(200).json(resp)
    } catch (err) {
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let resp = await userController.handleDeleteUser(req)
        res.status(200).json(resp)
    } catch (err) {
        next(err)
    }
}

export const userView = {
    loginUser,
    logoutUser,
    createUser,
    getUser,
    updateUser,
    deleteUser
}