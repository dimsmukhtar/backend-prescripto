// dashboard (jumlah user, jumlah penyakit, jumlah gejala)
// daftar user
// crud penyakit
// crud gejala
// update pertanyaan user
const { User, Penyakit, Gejala, Questions, Diagnosa } = require("../models")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const ApiError = require("../utils/apiError")

// pakar

const loginPakar = async (req, res, next) => {
  const { email, password } = req.body
  try {
    if (!email || !password) {
      return next(new ApiError("Email dan Password diperlukan untuk login!"), 400)
    }

    const user = await User.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      return next(
        new ApiError("Email tidak terdaftarkan, mohon gunakan email yang sudah teregisterkan!"),
        401
      )
    }

    if (user.role === "user") {
      return next(new ApiError("Login ini khusus untuk pakar!", 400))
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (comparePassword === false) {
      return next(new ApiError("Password yang anda masukkan salah!"), 400)
    }

    await User.update(
      {
        lastLogin: new Date(),
      },
      {
        where: { id: user.id },
      }
    )

    const token = jwt.sign(
      {
        id: user.id,
        nama: user.nama,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )

    return res.status(200).json({
      success: true,
      message: "Login pakar berhasil",
      token,
    })
  } catch (err) {
    return next(new ApiError(err.message), 500)
  }
}

const getDataDashboard = async (req, res, next) => {
  try {
    const verifiedUsers = await User.count({
      where: {
        isVerified: true,
      },
    })

    const gejalas = await Gejala.count()
    const penyakits = await Penyakit.count()

    return res.status(200).json({
      success: true,
      message: "Success, fetch",
      data: {
        verifiedUsers,
        gejalas,
        penyakits,
      },
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// route api getDataDashboard = http://localhost:3000/api/v1/pakar/dashboard

// response api getDataDashboard
// {
//   "success": true,
//   "message": "Success, fetch",
//   "data": {
//       "verifiedUsers": 2,
//       "gejalas": 32,
//       "penyakits": 11
//   }
// }

const userList = async (req, res, next) => {
  try {
    const isVerified = req.query.isVerified || ""
    const whereClause = {}
    if (isVerified) {
      whereClause.isVerified = isVerified
    }
    const data = await User.findAll({
      include: [
        {
          model: Diagnosa,
          include: [
            {
              model: Penyakit,
              attributes: ["id", "nama"], // Atribut gejala
            },
          ],
        },
      ],
      where: whereClause,
    })
    return res.status(200).json({
      success: true,
      message: "success, fetch",
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// route api userList = http://localhost:3000/api/v1/pakar/user/list

// response api userList
// {
//   "success": true,
//   "message": "success, fetch",
//   "data": [
//       {
//           "id": 3,
//           "nama": "dims",
//           "email": "dimsmukhtar@gmail.com",
//           "password": "$2b$10$U5XIz21aoFsQ1GaUntRRD.EPjXF1NMktl.htLkOiM7VB0dUEcn3xq",
//           "role": "user",
//           "lastLogin": "2024-12-21T08:51:50.499Z",
//           "profileUrl": "https://ik.imagekit.io/yxctvbjvh/profilepic.png?updatedAt=1734338115538",
//           "isVerified": true,
//           "resetPasswordToken": null,
//           "resetPasswordExpiresAt": null,
//           "verificationToken": "303809",
//           "verificationTokenExpiresAt": "2024-12-22T07:31:23.763Z",
//           "createdAt": "2024-12-21T07:31:23.765Z",
//           "updatedAt": "2024-12-21T08:51:50.500Z",
//           "Diagnosas": [
//               {
//                   "id": 1,
//                   "id_user": 3,
//                   "id_penyakit": "P2",
//                   "createdAt": "2024-12-21T07:34:51.960Z",
//                   "updatedAt": "2024-12-21T07:34:51.960Z",
//                   "Penyakit": {
//                       "id": "P2",
//                       "nama": "Gingivitis"
//                   }
//               },
//               {
//                   "id": 2,
//                   "id_user": 3,
//                   "id_penyakit": "P3",
//                   "createdAt": "2024-12-21T07:36:43.217Z",
//                   "updatedAt": "2024-12-21T07:36:43.217Z",
//                   "Penyakit": {
//                       "id": "P3",
//                       "nama": "Periodontitis"
//                   }
//               },
//               {
//                   "id": 3,
//                   "id_user": 3,
//                   "id_penyakit": "P2",
//                   "createdAt": "2024-12-21T08:46:03.495Z",
//                   "updatedAt": "2024-12-21T08:46:03.495Z",
//                   "Penyakit": {
//                       "id": "P2",
//                       "nama": "Gingivitis"
//                   }
//               }
//           ]
//       },
//       {
//           "id": 4,
//           "nama": "dr pakar",
//           "email": "argasadewa133@gmail.com",
//           "password": "$2a$12$jfTRbWtRWEXusOZFCGm/w.hjE0fg0Mfk8.pORTi01q3JJF7zZ6yNy",
//           "role": "pakar",
//           "lastLogin": "2024-12-21T08:18:23.231Z",
//           "profileUrl": "https://ik.imagekit.io/yxctvbjvh/profilepic.png?updatedAt=1734338115538",
//           "isVerified": true,
//           "resetPasswordToken": null,
//           "resetPasswordExpiresAt": null,
//           "verificationToken": null,
//           "verificationTokenExpiresAt": null,
//           "createdAt": "2024-12-21T07:58:13.419Z",
//           "updatedAt": "2024-12-21T08:18:23.233Z",
//           "Diagnosas": []
//       }
//   ]
// }

const getDiagnosaByIdUser = async (req, res, next) => {
  try {
    const data = await Diagnosa.findAll({
      where: {
        id_user: req.params.id,
      },
      include: [
        {
          model: Penyakit,
          attributes: ["nama"],
        },
      ],
    })
    if (!data) {
      return res.status(200).json({
        success: true,
        message: "user belum melakukan diagnosa",
        data,
      })
    }
    return res.status(200).json({
      success: true,
      message: "success, fetch",
      data,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// route api getDiagnosaByIdUser = http://localhost:3000/api/v1/pakar/user/diagnosa/3

// response api getDiagnosaByIdUser
// {
//   "success": true,
//   "message": "success, fetch",
//   "data": [
//       {
//           "id": 1,
//           "id_user": 3,
//           "id_penyakit": "P2",
//           "createdAt": "2024-12-21T07:34:51.960Z",
//           "updatedAt": "2024-12-21T07:34:51.960Z",
//           "Penyakit": {
//               "nama": "Gingivitis"
//           }
//       },
//       {
//           "id": 2,
//           "id_user": 3,
//           "id_penyakit": "P3",
//           "createdAt": "2024-12-21T07:36:43.217Z",
//           "updatedAt": "2024-12-21T07:36:43.217Z",
//           "Penyakit": {
//               "nama": "Periodontitis"
//           }
//       },
//       {
//           "id": 3,
//           "id_user": 3,
//           "id_penyakit": "P2",
//           "createdAt": "2024-12-21T08:46:03.495Z",
//           "updatedAt": "2024-12-21T08:46:03.495Z",
//           "Penyakit": {
//               "nama": "Gingivitis"
//           }
//       }
//   ]
// }

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    })
    if (!user) {
      return next(new ApiError(`User dengan id ${req.params.id} tidak ditemukan!`, 404))
    }
    await user.destroy({
      where: {
        id: req.params.id,
      },
    })
    return res.status(200).json({
      success: true,
      message: "Success, deleted",
      data: null,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

// route api deleteUser = http://localhost:3000/api/v1/pakar/user/1

const getPenyakitListForPakar = async (req, res, next) => {
  try {
    const penyakit = await Penyakit.findAll()

    if (!penyakit || penyakit.length === 0) {
      return next(new ApiError("Tidak ada data penyakit", 404))
    }

    const formattedData = penyakit.map((penyakitItem) => ({
      id: penyakitItem.id,
      nama: penyakitItem.nama,
      deskripsi: penyakitItem.deskripsi,
      solusi: penyakitItem.solusi,
      gejala: (penyakitItem.Aturans || []).map((aturan) => aturan.Gejala),
    }))

    res.status(200).json(formattedData)
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

module.exports = {
  loginPakar,
  getDataDashboard,
  userList,
  getDiagnosaByIdUser,
  deleteUser,
  getPenyakitListForPakar,
}
