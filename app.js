const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("express-async-errors")

const logger = require("./utils/logger")
const config = require("./utils/config")
const blogRouter = require("./controllers/blog_router")
const middleware = require("./utils/middleware")
const userRouter = require("./controllers/user_routers")

mongoose.set("strictQuery",false)

mongoose.connect(config.MONGODB_URI).then(()=>{
	logger.info("Connected to database successfully")
}).catch(error=>{
	logger.error("Connection to database failed",error)
})

const app = express()
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use(express.json())
app.use(cors())
app.use(middleware.requestLogger)

app.use("/api/blogs",blogRouter)
app.use('/api/users',userRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app