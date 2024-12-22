const { Penyakit, Gejala, Aturan } = require("../models")
const ApiError = require("../utils/apiError")

const createGejala = async (req, res, next) => {
  const { id, nama, deskripsi } = req.body
  try {
    const data = await Gejala.create({
      id,
      nama,
      deskripsi,
    })
    if (!nama || !deskripsi) {
      return res.status(400).json({
        success: false,
        message: "Nama dan deskripsi gejala harus diisi",
      })
    }
    return res.status(201).json({
      success: true,
      message: "berhasil membuat gejala baru",
      data: {
        id: data.id,
        nama: data.nama,
        deskripsi: data.deskripsi,
      },
    })
  } catch (error) {
    console.log(error)
    return next(new ApiError(error.message, 500))
  }
}

const getGejalaById = async (req, res, next) => {
  const { id } = req.params
  try {
    const gejala = await Gejala.findOne({
      where: {
        id,
      },
    })

    if (!gejala) {
      return next(new ApiError("Gejala tidak ditemukan", 404))
    }

    return res.status(200).json({
      success: true,
      gejala,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getGejalaByPenyakit = async (req, res, next) => {
  const { penyakitId } = req.params
  try {
    const gejala = await Gejala.findAll({
      include: [
        {
          model: Aturan,
          required: true, // Pastikan hanya aturan yang memiliki gejala terkait yang diambil
          include: [
            {
              model: Penyakit,
              attributes: ["id"],
              where: { id: penyakitId }, // Filter berdasarkan id_penyakit
              required: true, // Pastikan hanya aturan yang memiliki penyakit terkait yang diambil
            },
          ],
        },
      ],
    })

    const formattedData = gejala.map((gejalaItem) => ({
      id: gejalaItem.id,
      nama: gejalaItem.nama,
      deskripsi: gejalaItem.deskripsi,
    }))
    return res.status(200).json(formattedData)
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const getGejalaList = async (req, res, next) => {
  try {
    const gejala = await Penyakit.findAll()

    if (!gejala || gejala.length === 0) {
      return next(new ApiError("Tidak ada data gejala", 404))
    }

    const formattedData = gejala.map((gejalaItem) => ({
      id: gejalaItem.id,
      nama: gejalaItem.nama,
      deskripsi: gejalaItem.deskripsi,
    }))

    res.status(200).json(formattedData)
  } catch (error) {
    console.error("Error fetching data:", error)
    return next(new ApiError(error.message, 500))
  }
}

const deleteGejalaById = async (req, res, next) => {
  const { id } = req.params
  try {
    const gejala = await Gejala.findOne({
      where: {
        id,
      },
    })

    if (!gejala) {
      return next(new ApiError("Gejala tidak ditemukan", 404))
    }

    await Gejala.destroy({
      where: {
        id,
      },
    })

    return res.status(200).json({
      success: true,
      message: "gejala sukses dihapus",
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const updateGejalaById = async (req, res, next) => {
  const { id, nama, deskripsi } = req.body
  try {
    const gejala = await Gejala.findOne({
      where: {
        id: req.params.id,
      },
    })

    if (!gejala) {
      return next(new ApiError("Gejala tidak ditemukan", 404))
    }

    const updatedGejala = await Gejala.update(
      {
        id,
        nama,
        deskripsi,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

    return res.status(200).json({
      success: true,
      message: "gejala sukses diupdate",
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  getGejalaById,
  getGejalaList,
  deleteGejalaById,
  updateGejalaById,
  createGejala,
  getGejalaByPenyakit,
}
