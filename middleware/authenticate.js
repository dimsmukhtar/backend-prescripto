const jwt = require("jsonwebtoken")
const { User } = require("../models")
const ApiError = require("../utils/apiError")

module.exports = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization

    if (!bearerToken) {
      return next(new ApiError("tidak ada token"), 401)
    }
    const token = bearerToken.split("Bearer ")[1]

    const payloadUser = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findByPk(payloadUser.id)
    if (!user) {
      return next(new ApiError("User dengan token ini tidak ditemukan", 404))
    }
    req.user = user
    return next()
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}
