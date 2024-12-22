require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

const app = express()

const ApiError = require("./utils/apiError")
const errorHandler = require("./controllers/errorController")
const router = require("./routes")

const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.CLIENT_PAKAR_URL],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(router)

app.all("*", (req, res, next) => {
  next(new ApiError("Routes does not exist", 404))
})

app.use(errorHandler)

module.exports = app
