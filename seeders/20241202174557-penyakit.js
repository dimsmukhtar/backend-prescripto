"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Penyakits",
      [
        {
          id: "P1",
          nama: "Karies",
          deskripsi: "Kerusakan pada gigi yang disebabkan oleh asam dari bakteri.",
          solusi: "Sikat gigi secara teratur dan periksa ke dokter gigi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P2",
          nama: "Gingivitis",
          deskripsi: "Peradangan pada gusi akibat penumpukan plak di sekitar gigi.",
          solusi: "Perawatan gusi dengan menyikat gigi secara teratur dan obat kumur.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P3",
          nama: "Periodontitis",
          deskripsi: "Peradangan lebih lanjut yang dapat merusak jaringan penyangga gigi.",
          solusi: "Pengobatan oleh dokter gigi dan pembersihan profesional.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P4",
          nama: "Pulpitis",
          deskripsi: "Peradangan pada pulpa gigi yang menyebabkan nyeri.",
          solusi: "Perawatan saluran akar atau pencabutan gigi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P5",
          nama: "Abses Gigi",
          deskripsi: "Infeksi bakteri di dalam atau sekitar gigi yang menyebabkan nanah.",
          solusi: "Pengobatan antibiotik dan mungkin pembedahan.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P6",
          nama: "Bruxism",
          deskripsi: "Kebiasaan menggertakkan atau menggesekkan gigi secara tidak sadar.",
          solusi: "Menggunakan pelindung mulut dan mengelola stres.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P7",
          nama: "Impaksi Gigi",
          deskripsi: "Gigi yang terjebak di bawah gusi dan tidak dapat muncul dengan normal.",
          solusi: "Pengangkatan gigi impaksi oleh dokter gigi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P8",
          nama: "Maloklusi",
          deskripsi: "Kondisi di mana gigi atas dan bawah tidak sejajar.",
          solusi: "Pemakaian kawat gigi untuk merapikan gigi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P9",
          nama: "Hipoplasia Enamel",
          deskripsi: "Kondisi di mana enamel gigi tidak terbentuk dengan sempurna.",
          solusi: "Pengobatan oleh dokter gigi dan penggunaan pelindung gigi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P10",
          nama: "Fluorosis Gigi",
          deskripsi: "Kondisi ketika gigi terkena terlalu banyak fluor.",
          solusi: "Perawatan oleh dokter gigi dan pemutihan gigi jika perlu.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "P11",
          nama: "Erosi Gigi",
          deskripsi: "Kehilangan lapisan enamel gigi karena paparan asam.",
          solusi: "Menghindari makanan/minuman asam dan menggunakan pelindung gigi.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Penyakits", null, {})
  },
}
