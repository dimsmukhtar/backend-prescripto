const ApiError = require("../utils/apiError")

const test = (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: "success",
    data: null,
  })
}

module.exports = {
  test,
}
