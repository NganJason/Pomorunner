const httpStatusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER: 500,
    UNAUTHORIZED: 401
}

class BaseError extends Error {
    constructor (name, statusCode, message){
        super(message);
        this.name = name
        this.statusCode = statusCode
        Error.captureStackTrace(this)
    }   
}

class UnauthorizedError extends BaseError {
    constructor(
      message, 
      statusCode = httpStatusCodes.UNAUTHORIZED,
      name="Unauthorized Error"
    ) {
        super(name, statusCode, message);
    }
}

class BadRequestError extends BaseError {
    constructor(
        message,
        statusCode = httpStatusCodes.BAD_REQUEST,
        name="Bad Request Error"
    ) {
        super(name, statusCode, message)
    }
}

class NotFoundError extends BaseError {
    constructor(
        message,
        statusCode = httpStatusCodes.NOT_FOUND,
        name="Not Found Error"
    ) {
        super(name, statusCode, message)
    }
}

class IntervalServerError extends BaseError {
    constructor(
        message,
        statusCode = httpStatusCodes.INTERNAL_SERVER,
        name="Internal Server Error"
    ) {
        super(name, statusCode, message)
    }
}

export const errorResponse = {
  BaseError,
  UnauthorizedError,
  BadRequestError,
  NotFoundError,
  IntervalServerError,
};

const logError = (err) => {

    let today = new Date();
    let date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    const error = {
      date: dateTime,
      name: err.name,
      statusCode: err.statusCode,
      message: err.message,
      stack: err.stack,
    };

    console.log(error)
}

export const errorLogger = {
    logError
}