const { Aturan, Penyakit, Diagnosa } = require("../models")
const ApiError = require("../utils/apiError")
const { Gejala } = require("../models")

const forwardChaining = async (req, res, next) => {
  const { gejala } = req.body
  const { id } = req.user
  try {
    const aturan = await Aturan.findAll()

    const kecocokanPenyakit = {}

    aturan.forEach((rule) => {
      if (gejala.includes(rule.id_gejala)) {
        if (!kecocokanPenyakit[rule.id_penyakit]) {
          kecocokanPenyakit[rule.id_penyakit] = 0
        }
        kecocokanPenyakit[rule.id_penyakit] += 1
      }
    })

    // Ambil penyakit dengan jumlah kecocokan tertinggi
    const penyakitSorted = Object.entries(kecocokanPenyakit).sort((a, b) => b[1] - a[1])

    if (penyakitSorted.length === 0) {
      // Jika tidak ada penyakit yang cocok
      return next(new ApiError("Tidak ada penyakit yang cocok", 404))
    }

    // Ambil ID penyakit dengan kecocokan tertinggi
    const id_penyakit = penyakitSorted[0][0] // ID penyakit pertama dengan kecocokan tertinggi

    // Ambil detail penyakit dari database
    const penyakit = await Penyakit.findByPk(id_penyakit)

    if (!penyakit) {
      return next(new ApiError("Penyakit tidak ditemukan di database", 404))
    }

    // Simpan hasil diagnosa di tabel Diagnosa
    const diagnosa = await Diagnosa.create({
      id_user: id,
      id_penyakit: id_penyakit,
    })

    // Kirimkan hasil diagnosa ke frontend
    return res.status(200).json({
      success: true,
      message: "Diagnosa berhasil",
      diagnosa,
      hasil: penyakit,
    })
  } catch (err) {
    return next(new ApiError(err.message), 500)
  }
}

const getGejala = async (req, res, next) => {
  try {
    const gejala = await Gejala.findAll({
      attributes: ["id", "deskripsi"], // Ambil hanya ID dan deskripsi
    })
    return res.status(200).json({
      success: true,
      gejala,
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

const riwayatDiagnosa = async (req, res, next) => {
  try {
    const diagnosas = await Diagnosa.findAll({
      where: {
        id_user: req.user.id,
      },
      include: [
        {
          model: Penyakit,
          attributes: ["nama", "deskripsi"], // Ambil hanya kolom yang diperlukan
        },
      ],
    })

    return res.status(200).json({
      success: true,
      diagnosas: diagnosas.map((d) => ({
        id: d.id,
        namaPenyakit: d.Penyakit?.nama || "Penyakit tidak ditemukan",
        deskripsiPenyakit: d.Penyakit?.deskripsi || "Deskripsi tidak tersedia",
        tanggalDiagnosa: d.createdAt, // Gunakan createdAt sebagai tanggal diagnosa
      })),
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  forwardChaining,
  getGejala,
  riwayatDiagnosa,
}
