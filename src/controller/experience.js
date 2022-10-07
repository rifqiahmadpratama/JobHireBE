const { v4: uuidv4 } = require("uuid");
const commonHelper = require("../helper/common");
const createError = require("http-errors");
const { create, select } = require("../models/experience");

const experienceController = {
  experience: async (req, res, next) => {
    try {
      const {
        posisi,
        nama_perusahaan,
        bulan_tahun,
        deskripsi_singkat,
        id_worker,
      } = req.body;
      const id = uuidv4();
      const data = {
        id,
        posisi,
        nama_perusahaan,
        bulan_tahun,
        deskripsi_singkat,
        id_worker,
      };
      create(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "create skill succes")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  getExperiences: (req, res, next) => {
    const id = req.params.id;
    select(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200);
      })
      .catch((err) => res.send(err));
  },
};

module.exports = experienceController;
