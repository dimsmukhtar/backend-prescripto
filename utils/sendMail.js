require("dotenv").config()
const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
})

const sendMail = async (data) => {
  try {
    await transporter.sendMail({
      from: '"dims" dimsmukhtar@gmail.com',
      to: data.email,
      subject: data.subject,
      html: data.html,
    })
  } catch (error) {
    console.log(error)
  }
}

const sendPasswordResetEmail = async (email, linkReset) => {
  try {
    await transporter.sendMail({
      from: '"dims" dimsmukhtar@gmail.com',
      to: email,
      subject: "Request Reset Sandi/Password",
      html: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password Anda</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(to right, #5f6FFF, #5f6FFF); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Password Reset</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello,</p>
      <p>Kami menerima permintaan untuk mengatur ulang kata sandi Anda. Jika Anda tidak mengajukan permintaan ini, harap abaikan email ini.</p>
      <p>Untuk mengatur ulang kata sandi Anda, klik tombol di bawah:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${linkReset}" style="background-color: #5f6FFF; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </div>
      <p>Tautan ini akan kedaluwarsa dalam 1 jam karena alasan keamanan.</p>
      <p>Salam,<br>DiagnoDent Team</p>
    </div>
    <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
      <p>Ini adalah pesan otomatis, mohon jangan membalas email ini.</p>
    </div>
  </body>
  </html>`,
    })
  } catch (error) {
    console.log(error)
  }
}

const sendResetSuccessEmail = async (email) => {
  try {
    await transporter.sendMail({
      from: '"dims" dimsmukhtar@gmail.com',
      to: email,
      subject: "Sandi Berhasil di Reset",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sandi atau Password berhasil di Ganti</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(to right, #5f6FFF, #5f6FFF); padding: 20px; text-align: center;">
    <h1 style="color: white; margin: 0;">Sukses ganti kata sandi</h1>
  </div>
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 0 5px 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
    <p>Hello,</p>
    <p>Kami mengirim email ini untuk mengonfirmasi bahwa kata sandi Anda telah berhasil disetel ulang.</p>
    <div style="text-align: center; margin: 30px 0;">
      <div style="background-color: #5f6FFF; color: white; width: 50px; height: 50px; line-height: 50px; border-radius: 50%; display: inline-block; font-size: 30px;">
        ✓
      </div>
    </div>
    <p>Jika Anda tidak melakukan pengaturan ulang kata sandi ini, harap segera menghubungi tim dukungan kami.</p>
    <p>Untuk alasan keamanan, kami menyarankan Anda:</p>
    <ul>
      <li>Gunakan kata sandi yang kuat dan unik</li>
      <li>Hindari menggunakan kata sandi yang sama di beberapa situs</li>
    </ul>
    <p>Terima kasih telah membantu kami menjaga keamanan akun Anda..</p>
    <p>Salam,<br>DiagnoDent Team</p>
  </div>
  <div style="text-align: center; margin-top: 20px; color: #888; font-size: 0.8em;">
    <p>Ini adalah pesan otomatis, mohon jangan membalas email ini.</p>
  </div>
</body>
</html>`,
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  sendMail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
}
