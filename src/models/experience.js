const Pool = require("../config/db");

const create = (data) => {
  const {
    id,
    posisi,
    nama_perusahaan,
    bulan_tahun,
    deskripsi_singkat,
    id_worker,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO experience(id,posisi,nama_perusahaan,bulan_tahun,deskripsi_singkat,id_worker) VALUES('${id}','${posisi}','${nama_perusahaan}','${bulan_tahun}','${deskripsi_singkat}','${id_worker}')`,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

const select = (id) => {
  return Pool.query(`SELECT * FROM experience WHERE id_worker='${id}'`);
};

module.exports = {
  create,
  select,
};
