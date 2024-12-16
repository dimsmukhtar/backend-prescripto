"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Gejalas",
      [
        // Gejala untuk Karies
        {
          id: "GK1",
          nama: "Bau Mulut",
          deskripsi:
            "Apakah Anda mengalami bau mulut yang tidak sedap?, ini yang bisa menjadi tanda adanya infeksi bakteri akibat karies",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GK2",
          nama: "Nyeri Gigi",
          deskripsi:
            "Apakah gigi Anda terasa nyeri, terutama saat mengonsumsi makanan atau minuman panas, dingin, atau manis?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GK3",
          nama: "Lubang Gigi",
          deskripsi: "Apakah Anda melihat lubang pada permukaan gigi Anda yang terlihat jelas?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GK4",
          nama: "Sakit Saat Menggigit",
          deskripsi: "Apakah gigi Anda terasa sakit saat menggigit, mengunyah, atau disentuh?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Gingivitis
        {
          id: "GG1",
          nama: "Gusi Bengkak",
          deskripsi: "Apakah Anda merasakan bahwa gusi anda bengkak?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GG2",
          nama: "Gusi Merah",
          deskripsi: "Apakah Anda merasakan bahwa gusi anda merah?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GG3",
          nama: "Gusi Mudah Berdarah",
          deskripsi:
            "Apakah Anda merasakan bahwa gusi anda mudah berdarah terutama pada saya menyikat atau menggosok gigi?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Periodontitis
        {
          id: "GPE1",
          nama: "Gusi Menyusut",
          deskripsi:
            "Apakah Anda melihat gusi Anda menyusut, sehingga gigi terlihat lebih panjang?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GPE2",
          nama: "Gusi Bernanah",
          deskripsi: "Apakah gusi Anda bernanah?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GPE3",
          nama: "Gusi Berwarna Kemerahan",
          deskripsi: "Apakah gusi anda berwarna kemerahan atau keunguan?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GPE4",
          nama: "Penumpukan plak",
          deskripsi: "Apakah gigi Anda ada penumpukan plak dan karang gigi?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Pulpitis
        {
          id: "GPU1",
          nama: "Nyeri Tajam",
          deskripsi:
            "Apakah Anda merasakan nyeri gigi yang tajam dan berdenyut, terutama saat mengonsumsi makanan atau minuman panas, dingin, atau manis?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GPU2",
          nama: "Nyeri Tanpa Rangsangan",
          deskripsi:
            "Apakah gigi Anda terasa nyeri bahkan tanpa adanya rangsangan seperti makanan atau minuman?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Abses Gigi
        {
          id: "GA1",
          nama: "Nyeri Gigi Intens",
          deskripsi: "Apakah Anda merasakan nyeri gigi yang nyeri dan berdenyut?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GA2",
          nama: "Pembengkakan Gusi",
          deskripsi: "Apakah ada pembengkakan pada gusi atau wajah di sekitar gigi?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GA3",
          nama: "Demam",
          deskripsi: "Apakah Anda merasa demam atau merasa tidak enak badan?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GA4",
          nama: "Gusi bernanah",
          deskripsi: "Apakah ada benjolan kecil yang berisi putih seperti nanah pada gusi anda?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Bruxism
        {
          id: "GB1",
          nama: "Nyeri Rahang",
          deskripsi:
            "Apakah Anda merasakan nyeri pada rahang atau otot wajah, terutama di pagi hari?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GB2",
          nama: "Gigi Rusak",
          deskripsi:
            "Apakah Anda melihat kerusakan pada gigi, seperti retakan atau patah pada gigi?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GB3",
          nama: "Sakit Kepala",
          deskripsi:
            "Apakah Anda sering merasakan sakit kepala, terutama di pagi hari setelah bangun tidur?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Impaksi Gigi
        {
          id: "GI1",
          nama: "Nyeri Rahang Belakang",
          deskripsi:
            "Apakah Anda merasakan nyeri di area rahang belakang, di sekitar gigi impaksi?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GI2",
          nama: "Pembengkakan Gusi",
          deskripsi:
            "Apakah Anda merasakan pembengkakan pada gusi di sekitar gigi yang terjebak atau impaksi?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GI3",
          nama: "Gigi Terpendam",
          deskripsi: "Apakah ada gigi yang tumbuh terpendam atau tumbuh tidak normal?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Maloklusi
        {
          id: "GM1",
          nama: "Gigi Tidak Sejajar",
          deskripsi: "Apakah Anda melihat susunan gigi Anda yang tidak sejajar atau bertumpuk?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GM2",
          nama: "Kesulitan Mengunyah",
          deskripsi: "Apakah Anda mengalami kesulitan dalam mengunyah atau menggigit makanan?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GM3",
          nama: "Nyeri rahang",
          deskripsi: "Apakah Anda mengalami nyeri pada rahang?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Hipoplasia Enamel
        {
          id: "GH1",
          nama: "Noda Putih",
          deskripsi:
            "Apakah pada gigi Anda terdapat noda berwarna putih atau kekuningan atau juga kecokelatan?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GH2",
          nama: "Gigi Mudah Rusak",
          deskripsi: "Apakah mudah untuk rusak dan berlubang?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Fluorosis Gigi
        {
          id: "GF1",
          nama: "Bintik Putih atau Coklat",
          deskripsi:
            "Apakah Anda melihat bintik putih atau coklat pada permukaan gigi Anda, yang bisa menjadi tanda fluorosis?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GF2",
          nama: "Tekstur Gigi Kasar",
          deskripsi: "Apakah Anda merasa gigi Anda memiliki tekstur yang kasar?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Gejala untuk Erosi Gigi
        {
          id: "GE1",
          nama: "Gigi Pendek atau Menipis",
          deskripsi:
            "Apakah Anda melihat gigi Anda menjadi lebih pendek atau menipis, yang bisa menjadi tanda erosi gigi?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "GE2",
          nama: "Gigi Retak tidak Rata",
          deskripsi: "Apakah gigi anda ada retak atau tidak rata?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Gejalas", null, {})
  },
}
