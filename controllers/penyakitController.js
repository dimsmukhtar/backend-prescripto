const { Penyakit } = require("../models")
const ApiError = require("../utils/apiError")

const getPenyakitById = async (req, res, next) => {
  const { id } = req.params
  try {
    const penyakit = await Penyakit.findOne({
      where: {
        id,
      },
    })

    if (!penyakit) {
      return next(new ApiError("Penyakit tidak ditemukan", 404))
    }

    return res.status(200).json({
      success: true,
      penyakit,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = getPenyakitById
