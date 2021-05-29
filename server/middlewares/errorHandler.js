import {errorResponse, errorLogger} from "../utils/error.js"

const checkValidRoute = (req, res, next) => {
    if (!req.route) {
        return next(new errorResponse.NotFoundError('Invalid endpoint'))
    }
}

const logError = (err, req, res, next) => {
    errorLogger.logError(err)
    next(err)
}

const returnError = (err, req, res, next) => {
    res.status(err.statusCode || 500).json(
        {
            error_name: err.name,
            status_code: err.statusCode || 500,
            error:err.message
        }
    )
}

export const errorMiddleware = {
    checkValidRoute,
    logError,
    returnError
}