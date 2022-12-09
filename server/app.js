const express = require("express")
const cors = require("cors")
const authMiddleware = require("./config/middlewares/authMiddleware")

const subjectRouter = require("./routes/subjectRouter")
const teacherRouter = require("./routes/teacherRouter")
const articleRouter = require("./routes/articleRouter")
const literatureRouter = require("./routes/literatureRouter")
const certificateRouter = require("./routes/certificateRouter")
const userRouter = require("./routes/userRouter")
const authRouter = require("./routes/authRouter")
const AppError = require("./utils/appError")
const errorController = require("./controllers/errorController")
const attachmentRouter = require("./routes/attachmentRouter")

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/v1/subjects", authMiddleware, subjectRouter)
app.use("/api/v1/teachers", authMiddleware, teacherRouter)
app.use("/api/v1/articles", authMiddleware, articleRouter)
app.use("/api/v1/literatures", authMiddleware, literatureRouter)
app.use("/api/v1/certificates", authMiddleware, certificateRouter)
app.use("/api/v1/users", authMiddleware, userRouter)
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/attachments", attachmentRouter)

app.use(express.static(__dirname + "/static"))

app.all("*", (req, res, next) => {
    next(new AppError(`${req.path} not exists`, 404))
})
app.use(errorController)
module.exports = app