const { Questions } = require("../models")
const ApiError = require("../utils/apiError")

const getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Questions.findAll({
      where: {
        id_user: req.user.id,
      },
    })

    if (!questions) {
      return res.status(200).json({
        success: true,
        message: "anda belum membuat pertanyaan",
      })
    }

    res.status(200).json({
      success: true,
      questions,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}
const makeQuestion = async (req, res, next) => {
  const { pertanyaan } = req.body
  try {
    const questions = await Questions.create({
      pertanyaan,
      id_user: req.user.id,
    })

    res.status(200).json({
      success: true,
      message: "berhasil membuat pertanyaan",
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getAllQuestions,
  makeQuestion,
}
