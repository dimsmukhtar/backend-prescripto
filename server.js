const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

const ApiError = require("./utils/apiError")
const errorHandler = require("./controllers/errorController")
const router = require("./routes")

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())
app.use(router)

app.all("*", (req, res, next) => {
  next(new ApiError("Routes does not exist", 404))
})

app.use(errorHandler)

module.exports = app
