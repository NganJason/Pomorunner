import {userController} from "../controllers/userController.js"

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
    createUser,
    getUser,
    updateUser,
    deleteUser
}