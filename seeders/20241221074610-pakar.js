"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        nama: "dr pakar",
        role: "pakar",
        email: "prescripto-pakar@gmail.com",
        password: process.env.ADMIN_PASSWORD,
        isVerified: true,
        profileUrl: "https://ik.imagekit.io/yxctvbjvh/profilepic.png?updatedAt=1734338115538",
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {})
  },
}
