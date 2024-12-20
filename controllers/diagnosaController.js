const { Aturan, Penyakit, Diagnosa, User } = require("../models")
const ApiError = require("../utils/apiError")
const { Gejala } = require("../models")
const { sendMail } = require("../utils/sendMail")

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

    const data = {
      email: req.user.email,
      subject: "Hasil Diagnosa Anda di Prescripto",
      html: `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hasil Diagnosa</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f4f4f4;">
    <div style="background: linear-gradient(to right, #5f6FFF, #5f6FFF); color: white; text-align: center; padding: 20px; border-radius: 10px 10px 0 0;">
      <h1 style="margin: 0;">Hasil Diagnosa Anda</h1>
    </div>
    <div style="background-color: #ffffff; padding: 20px; border-radius: 0 0 10px 10px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Halo, ${req.user.nama},</p>
      <p>Terima kasih telah menggunakan layanan <b>Prescripto</b>. Berikut adalah hasil diagnosa Anda:</p>
      <h2 style="color: #5f6FFF;">${penyakit.nama}</h2>
      <p><b>Deskripsi:</b> ${penyakit.deskripsi}</p>
      <p><b>Solusi:</b> ${penyakit.solusi}</p>
      <div style="text-align: center; margin: 20px 0;">
        <a href="${process.env.CLIENT_URL}/riwayat-diagnosa" target="_blank" 
           style="display: inline-block; background-color: #5f6FFF; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
           Lihat Riwayat Diagnosa
        </a>
      </div>
      <p>Jika Anda memiliki pertanyaan lebih lanjut, jangan ragu untuk menghubungi tim kami.</p>
      <p>Salam,<br><b>Prescripto Team</b></p>
    </div>
    <div style="text-align: center; color: #888; font-size: 0.8em; margin-top: 20px;">
      <p>Ini adalah pesan otomatis, mohon jangan membalas email ini.</p>
    </div>
  </body>
  </html>`,
    }
    await sendMail(data)

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
