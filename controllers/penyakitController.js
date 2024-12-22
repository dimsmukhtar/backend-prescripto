const { Penyakit, Gejala, Aturan } = require("../models")
const ApiError = require("../utils/apiError")

const createPenyakit = async (req, res, next) => {
  const { id, nama, deskripsi, solusi } = req.body
  try {
    const data = await Penyakit.create({
      id,
      nama,
      deskripsi,
      solusi,
    })
    return res.status(200).json({
      success: true,
      message: "berhasil membuat penyakit baru",
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

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

const getPenyakitList = async (req, res, next) => {
  try {
    const penyakit = await Penyakit.findAll({
      include: [
        {
          model: Aturan,
          include: [
            {
              model: Gejala,
              attributes: ["id", "deskripsi"], // Atribut gejala
            },
          ],
        },
      ],
    })

    if (!penyakit || penyakit.length === 0) {
      return next(new ApiError("Tidak ada data penyakit", 404))
    }

    const formattedData = penyakit.map((penyakitItem) => ({
      id: penyakitItem.id,
      gejala: (penyakitItem.Aturans || []).map((aturan) => aturan.Gejala),
    }))

    res.status(200).json(formattedData)
  } catch (error) {
    console.error("Error fetching data:", error)
    return next(new ApiError(error.message, 500))
  }
}

const deletePenyakitById = async (req, res, next) => {
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

    await Penyakit.destroy({
      where: {
        id,
      },
    })

    return res.status(200).json({
      success: true,
      message: "penyakit sukses dihapus",
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updatePenyakitById = async (req, res, next) => {
  const { id, nama, deskripsi, solusi } = req.body
  try {
    const penyakit = await Penyakit.findOne({
      where: {
        id: req.params.id,
      },
    })

    if (!penyakit) {
      return next(new ApiError("Penyakit tidak ditemukan", 404))
    }

    const updatedPenyakit = await Penyakit.update(
      {
        id,
        nama,
        deskripsi,
        solusi,
      },
      {
        where: {
          id,
        },
      }
    )

    return res.status(200).json({
      success: true,
      message: "penyakit sukses diupdate",
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getPenyakitById,
  getPenyakitList,
  deletePenyakitById,
  updatePenyakitById,
  createPenyakit,
}
