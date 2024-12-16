const bcrypt = require("bcrypt")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { Op } = require("sequelize")
const ApiError = require("../utils/apiError")
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie")
const { sendMail, sendPasswordResetEmail, sendResetSuccessEmail } = require("../utils/sendMail")
const imagekit = require("../lib/imageKit")

const register = async (req, res, next) => {
  try {
    const { nama, email, password } = req.body

    if (!nama || !password || !email) {
      return next(new ApiError("Mohon isi credentials yang lengkap!"), 400)
    }

    const userr = await User.findOne({
      where: {
        email,
      },
    })

    if (userr) {
      return next(new ApiError("Email sudah terdaftar", 400))
    }

    const emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    if (!emailRegex.test(email)) {
      return next(new ApiError("Tolong masukkan alamat email yang benar dan valid!", 400))
    }

    const passwordLength = password.length < 8
    if (passwordLength) {
      return next(new ApiError("Password harus memiliki minimal 8 karakter"), 400)
    }

    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()

    const newUser = await User.create({
      nama,
      role: "user",
      email,
      profileUrl: "https://ik.imagekit.io/yxctvbjvh/profilepic.png?updatedAt=1734338115538",
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    })

    const token = jwt.sign(
      {
        id: newUser.id,
        nama: newUser.nama,
        email: newUser.email,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    )
    const data = {
      email,
      subject: "Kode untuk verifikasi email anda",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifikasi Email Anda</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #5f6FFF, #5f6FFF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Verifikasi Email Anda</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Terimakasih sudah mendaftarkan diri anda di Prescripto!, berikut adalah kode verifikasi anda:</p>
    <div style="text-align: center; margin: 30px 0;">
      <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #5f6FFF;">${verificationToken}</span>
    </div>
    <p>Masukkan kode ini pada halaman verifikasi untuk menyelesaikan pendaftaran Anda.</p>
    <p>Kode ini akan kedaluwarsa dalam 24 jam demi alasan keamanan.</p>
    <p>Jika Anda tidak membuat akun dengan kami, harap abaikan email ini.</p>
    <p>Salam,<br>Prescripto Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>
Ini adalah pesan otomatis, mohon jangan membalas email ini.</p>
  </div>
</body>
</html>,`,
    }
    await sendMail(data)

    return res.status(201).json({
      success: true,
      message: "Register berhasil",
      token,
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

const verifyEmail = async (req, res) => {
  const { code } = req.body
  try {
    // const user = await User.findOne({
    //   verificationToken: code,
    //   verificationTokenExpiresAt: { $gt: Date.now() },
    // })

    const user = await User.findOne({
      where: {
        verificationToken: code,
        verificationTokenExpiresAt: {
          [Op.gt]: new Date(), // Kondisi `ExpiresAt` lebih besar dari sekarang
        },
      },
    })

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "kode salah atau kode verifikasi kadaluwarsa",
      })
    }

    await user.update(
      {
        isVerified: true,
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
      },
      {
        where: { id: user.id },
      }
    )
    const data = {
      email: user.email,
      subject: "Selamat Datang di Prescripto!",
      html: `<!DOCTYPE html>
<html>
<head>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333;">
    <div style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background-color: #5f6FFF; color: white; text-align: center; padding: 20px;">
            <h1 style="margin: 0;">Selamat Datang Di Sistem Kami!</h1>
        </div>

        <!-- Content -->
        <div style="padding: 20px;">
            <h2 style="color: #5f6FFF; font-size: 24px;">Hi ${user.nama},</h2>
            <p style="line-height: 1.6;">Terima kasih telah mendaftar ke sistem kami! Kami sangat senang Anda bergabung. Di sini, Anda akan menemukan banyak fitur dan sumber daya yang dirancang khusus untuk Anda.</p>

            <p style="line-height: 1.6;">Untuk memulai, klik tombol di bawah dan jelajahi semua hal menakjubkan yang kami tawarkan:</p>

            <a href="[YOUR_SYSTEM_URL]" target="_blank" style="display: inline-block; margin-top: 20px; padding: 10px 20px; color: white; background-color:  #5f6FFF; text-decoration: none; border-radius: 4px; font-size: 16px;">Go to Dashboard</a>

            <p style="line-height: 1.6;">Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim dukungan kami kapan saja.</p>

            <p style="line-height: 1.6;">Salam,</p>
            <p style="line-height: 1.6;">Prescripto Team</p>
        </div>

        <!-- Footer -->
        <div style="text-align: center; font-size: 12px; color: #888; padding: 20px; border-top: 1px solid #eaeaea;">
            <p style="margin: 0;">&copy; 2024 Prescripto. All rights reserved.</p>
            <p style="margin: 0;">Need help? <a href="example@gmail.com" style="color: #5f6FFF; text-decoration: none;">Contact Support</a></p>
        </div>
    </div>
</body>
</html>
`,
    }
    await sendMail(data)

    res.status(200).json({
      success: true,
      message: "email sukses terverifikasi",
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

const login = async (req, res, next) => {
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
      message: "Login berhasil",
      token,
    })
  } catch (err) {
    return next(new ApiError(err.message), 500)
  }
}

const logout = async (req, res) => {
  res.clearCookie("token")
  res.status(200).json({
    success: true,
    message: "logout berhasil",
  })
}

const forgotPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    })

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User dengan email tersebut tidak ditemukan!" })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex")
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000 // 1 hour

    await user.update(
      {
        resetPasswordToken: resetToken,
        resetPasswordExpiresAt: resetTokenExpiresAt,
      },
      {
        where: { id: user.id },
      }
    )

    // send email
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    )

    res
      .status(200)
      .json({ success: true, message: "Link untuk reset password sudah di kirim ke email anda!" })
  } catch (error) {
    console.log("Error in forgotPassword ", error)
    res.status(400).json({ success: false, message: error.message })
  }
}

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params
    const { password } = req.body

    // const user = await User.findOne({
    //   resetPasswordToken: token,
    //   resetPasswordExpiresAt: { $gt: Date.now() },
    // })

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpiresAt: {
          [Op.gt]: new Date(), // Kondisi `ExpiresAt` lebih besar dari sekarang
        },
      },
    })

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid atau reset token anda sudah expired" })
    }

    // update password
    const hashedPassword = await bcrypt.hash(password, 10)
    await user.update(
      {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined,
      },
      {
        where: { id: user.id },
      }
    )

    await sendResetSuccessEmail(user.email)

    res.status(200).json({ success: true, message: "Password anda berhasil di reset!" })
  } catch (error) {
    console.log("Error in resetPassword ", error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const me = async (req, res, next) => {
  try {
    const user = {
      id: req.user.id,
      nama: req.user.nama,
      role: req.user.role,
      isVerified: req.user.isVerified,
      email: req.user.email,
      lastLogin: req.user.lastLogin,
      profileUrl: req.user.profileUrl,
    }
    console.log(user)
    console.log(req.user)
    return res.status(200).json({
      success: true,
      message: "Success",
      user,
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

const editProfile = async (req, res, next) => {
  // prettier-ignore
  const {
    nama, email,
  } = req.body

  const { file } = req
  let image
  try {
    if (file) {
      const split = file.originalname.split(".")
      const extension = split[split.length - 1]

      const img = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      })
      image = img.url
    }
    const user = await User.findOne({
      where: { id: req.user.id },
    })
    await User.update(
      {
        nama,
        profileUrl: image,
        email,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    )

    return res.status(200).json({
      success: true,
      message: "Success, updated",
    })
  } catch (error) {
    return next(new ApiError(error.message, 500))
  }
}

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
      return next(new ApiError("Login khusus untuk pakar", 400))
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

module.exports = {
  register,
  login,
  verifyEmail,
  resetPassword,
  logout,
  forgotPassword,
  me,
  editProfile,
  loginPakar,
}
