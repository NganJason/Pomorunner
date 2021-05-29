import app from "./app.js"
import config from "./config.js"
import { dbRepo } from "./repository/dbRepo.js";
import { subtaskRouter } from "./routers/subtaskRouter.js";
import { taskRouter } from "./routers/taskRouter.js";
import { userRouter } from "./routers/userRouter.js";
import { errorMiddleware } from "./middlewares/errorHandler.js"
import { errorResponse } from "./utils/error.js"

import mongoose from "mongoose"

const PORT = config.port;
const mongoURI = config.mongoURI;

const run = async() => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Successfully connected to database")

        global.DBRepo = new dbRepo()    
        console.log("Initialized DB Repo")

        global.errorResponse = errorResponse;
        console.log("Initialized global objects")
    
        // Routes
        app.use("/api/user", userRouter)
        app.use("/api/task", taskRouter)
        app.use("/api/subtask", subtaskRouter);

        app.use(errorMiddleware.checkValidRoute)
        app.use(errorMiddleware.logError)
        app.use(errorMiddleware.returnError)
        
        app.listen(PORT, err => {
            if(err) {
                throw err;
            } else {
                console.log(`App is listening at port ${PORT}!`);
            }
        })
    } catch(err) {
        console.log(`Failed to start server. Error: ${err}`)
    }
}

run();