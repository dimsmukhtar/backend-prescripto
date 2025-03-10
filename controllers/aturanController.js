const { Aturan, Gejala, Penyakit } = require("../models")
const ApiError = require("../utils/apiError")

const createRule = async (req, res, next) => {
  const { id_penyakit, id_gejala } = req.body
  try {
    if (!id_penyakit || !id_gejala) {
      return res.status(400).json({ message: "ID penyakit dan gejala harus diberikan" })
    }

    const penyakit = await Penyakit.findByPk(id_penyakit)
    const gejala = await Gejala.findByPk(id_gejala)

    if (!penyakit || !gejala) {
      return res.status(404).json({ message: "Penyakit atau Gejala tidak ditemukan" })
    }
    const aturan = await Aturan.create({
      id_penyakit: id_penyakit,
      id_gejala: id_gejala,
    })

    res.status(201).json({
      message: "Aturan berhasil dibuat",
      data: aturan,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = createRule
