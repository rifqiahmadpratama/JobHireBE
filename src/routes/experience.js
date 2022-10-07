const express = require("express");
const router = express.Router();
const { experience, getExperiences } = require("../controller/experience");

router.post("/create", experience).get("/:id", getExperiences);

module.exports = router;
