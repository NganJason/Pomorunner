import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        const {id, email} = jwt.verify(token, process.env.JWT_SECRET)

        const user = await DBRepo.user.findUserByID(id)

        if (!user) {
            return next(new errorResponse.UnauthorizedError(`Invalid user`));
        }

        req.user = {
            id,
            email
        }

        return next()
    } catch(err) {
        return next(new errorResponse.BadRequestError(err));
    }
}

const isAuthorized = async (req, res, next) => {
    const inputUserID = req.body.user_id || req.query.user_id

    if (inputUserID == undefined) {
        return next(new errorResponse.BadRequestError(`User id is not given`));
    }

    if (req.user.id == inputUserID) {
        return next()
    } else {
        return next(new errorResponse.UnauthorizedError(`Invalid user`));
    }
}

export const auth = {
    isAuthenticated,
    isAuthorized
}