const { User } = require("../models")
const ApiError = require("../utils/apiError")

module.exports = async (req, res, next) => {
  try {
    const isVerified = req.user.isVerified
    if (!isVerified) {
      return next(new ApiError("Email anda belum terverifikasi", 401))
    }
    return next()
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}
