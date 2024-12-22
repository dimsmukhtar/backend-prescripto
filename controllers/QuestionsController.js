const { Questions, User } = require("../models")
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

const updateQuestionForPakar = async (req, res, next) => {
  const { id } = req.params
  const { jawabannya } = req.body

  try {
    const question = await Questions.findOne({
      where: {
        id: id,
      },
    })

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Pertanyaan tidak ditemukan",
      })
    }

    question.jawaban = jawabannya
    await question.save()

    res.status(200).json({
      success: true,
      message: "Pertanyaan berhasil dijawab",
      question,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getAllQuestionsForPakar = async (req, res, next) => {
  try {
    const questions = await Questions.findAll({
      include: {
        model: User, // Mengambil data user terkait
        attributes: ["nama"],
      },
    })

    if (questions.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Tidak ada pertanyaan saat ini.",
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

module.exports = {
  getAllQuestions,
  makeQuestion,
  updateQuestionForPakar,
  getAllQuestionsForPakar,
}
