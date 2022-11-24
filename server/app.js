const express = require("express")
const cors = require("cors")
const authMiddleware = require("./config/middlewares/authMiddleware")

const courseRouter = require("./routes/courseRouter")
const studentRouter = require("./routes/studentRouter")
const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/authRouter")
const AppError = require("./utils/appError")
const errorController = require("./controllers/errorController")
const attachmentRouter = require("./routes/attachmentRouter")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/courses", courseRouter)
app.use("/api/v1/students", authMiddleware, studentRouter)
app.use("/api/v1/users", authMiddleware, userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/attachments", attachmentRouter)

app.use(express.static(__dirname + "/static"))

app.all("*", (req, res, next) => {
    next(new AppError(`${req.path} not exists`, 404))
})
app.use(errorController)
module.exports = app