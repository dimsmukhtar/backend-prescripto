const ApiError = require("../utils/apiError")

const checkRole = (roles) => async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(`Anda bukan ${roles.toString()}, akses anda di blok!`, 401))
  }
  return next()
}

module.exports = checkRole
