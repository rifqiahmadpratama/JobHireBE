const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { findEmail, create } = require("../models/users");
const commonHelper = require("../helper/common");
const authHelper = require("../helper/auth");

const UserController = {
  register: async (req, res, next) => {
    try {
      const { email, password, name, role } = req.body;
      const { rowCount } = await findEmail(email);

      const passwordHash = bcrypt.hashSync(password);

      if (rowCount) {
        return next(createError(403, "Email is already used"));
      }
      const data = {
        id: uuidv4(),
        email,
        passwordHash,
        name,
        role,
      };
      create(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Users Job created")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const {
        rows: [user],
      } = await findEmail(email);
      if (!user) {
        return commonHelper.response(res, null, 403, "Email is invalid");
      }
      const passwordHash = bcrypt.hashSync(password);
      console.log("Tes = " + passwordHash);

      if (!passwordHash) {
        return commonHelper.response(res, null, 403, "Password is invalid");
      }
      delete user.password;
      const payload = {
        email: user.email,
        role: user.role,
      };
      user.token = authHelper.generateToken(payload);
      user.refreshToken = authHelper.generateRefershToken(payload);

      commonHelper.response(res, user, 201, "login is successful");
    } catch (error) {
      console.log(error);
    }
  },
  profile: async (req, res, next) => {
    const email = req.payload.email;
    const {
      rows: [user],
    } = await findEmail(email);
    delete user.password;
    commonHelper.response(res, user, 200);
  },
  refreshToken: (req, res) => {
    const refershToken = req.body.refershToken;
    const decoded = jwt.verify(refershToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
      role: decoded.role,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refershToken: authHelper.generateRefershToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};

module.exports = UserController;
