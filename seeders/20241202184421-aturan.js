"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Aturans",
      [
        // Aturan untuk Karies (P1)
        { id_penyakit: "P1", id_gejala: "GK1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P1", id_gejala: "GK2", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P1", id_gejala: "GK3", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P1", id_gejala: "GK4", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Gingivitis (P2)
        { id_penyakit: "P2", id_gejala: "GG1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P2", id_gejala: "GG2", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P2", id_gejala: "GG3", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Periodontitis (P3)
        { id_penyakit: "P3", id_gejala: "GPE1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P3", id_gejala: "GPE2", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P3", id_gejala: "GPE3", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P3", id_gejala: "GPE4", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Pulpitis (P4)
        { id_penyakit: "P4", id_gejala: "GPU1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P4", id_gejala: "GPU2", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Abses Gigi (P5)
        { id_penyakit: "P5", id_gejala: "GA1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P5", id_gejala: "GA2", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P5", id_gejala: "GA3", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P5", id_gejala: "GA4", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Bruxism (P6)
        { id_penyakit: "P6", id_gejala: "GB1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P6", id_gejala: "GB2", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P6", id_gejala: "GB3", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Impaksi Gigi (P7)
        { id_penyakit: "P7", id_gejala: "GI1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P7", id_gejala: "GI2", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P7", id_gejala: "GI3", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Maloklusi (P8)
        { id_penyakit: "P8", id_gejala: "GM1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P8", id_gejala: "GM2", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P8", id_gejala: "GM3", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Hipoplasia Enamel (P9)
        { id_penyakit: "P9", id_gejala: "GH1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P9", id_gejala: "GH2", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Fluorosis Gigi (P10)
        { id_penyakit: "P10", id_gejala: "GF1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P10", id_gejala: "GF2", createdAt: new Date(), updatedAt: new Date() },

        // Aturan untuk Erosi Gigi (P11)
        { id_penyakit: "P11", id_gejala: "GE1", createdAt: new Date(), updatedAt: new Date() },
        { id_penyakit: "P11", id_gejala: "GE2", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Aturans", null, {})
  },
}
