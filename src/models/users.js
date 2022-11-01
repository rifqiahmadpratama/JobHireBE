const Pool = require("../config/db");

const selectWorker = ({ sortby, limit, offset, search, sort, email }) => {
  return new Promise((resolve, reject) => {
    Pool.query(
      `SELECT * FROM users WHERE ${sortby}  ILIKE'%${search}%' AND email != '${email}' ORDER BY  ${sortby} ${sort} LIMIT $1 OFFSET $2 `,
      [limit, offset],
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      }
    );
  });
};
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM users WHERE email='${email}'`,
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

const findID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const countData = () => {
  return new Promise((resolve, reject) =>
    Pool.query("SELECT COUNT(*) FROM users", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const create = (data) => {
  const { id, email, passwordHash, name, role } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users(id, email,password,name,role) VALUES('${id}','${email}','${passwordHash}','${name}','${role}')`,
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

const updateimage = (data) => {
  const { email, picture } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET picture = '${picture}' WHERE email='${email}'`,
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

const updateAccount = (
  email,
  name,
  job_desk,
  domicili,
  location,
  description,
  picture
) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      ` update users set name='${name}',  job_desk='${job_desk}', domicili='${domicili}', location='${location}', description='${description}', picture='${picture}' where email='${email}'`,
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
module.exports = {
  selectWorker,
  findID,
  findEmail,
  countData,
  updateimage,
  create,
  updateAccount,
};
