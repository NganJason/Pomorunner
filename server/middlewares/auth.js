import jwt from "jsonwebtoken"

const isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token;

    try {
        const {id, email} = jwt.verify(token, process.env.JWT_SECRET)

        const user = await DBRepo.user.findUserByID(id)

        if (!user) {
            return next(new Error("Invalid user"));
        }

        req.user = {
            id,
            email
        }
        return next()
    } catch(err) {
        return next(err);
    }
}

const isAuthorized = async (req, res, next) => {
    const inputUserID = req.body.user_id

    if (inputUserID == undefined) {
        inputUserID = req.query.user_id;
    }

    if (req.user.id == inputUserID) {
        return next()
    } else {
        return next(new Error("Not authorized to query such data"));
    }
}

export const auth = {
    isAuthenticated,
    isAuthorized
}