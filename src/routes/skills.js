const express = require("express");
const router = express.Router();
const { skills, getSkills, deleteSkills } = require("../controller/skills");
const { protect } = require("../middlewares/auth");
router
  .post("/create", protect, skills)
  .get("/:id", protect, getSkills)
  .delete("/id", protect, deleteSkills);

module.exports = router;
