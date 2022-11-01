const express = require("express");
const router = express.Router();
const {
  getPaginationSkill,
  getSkill,
  insertSkill,
  updateSkill,
  deleteSkill,
} = require("../controller/skills");
const { protect } = require("../middlewares/auth");

router
  .get("/", getPaginationSkill)
  .get("/:id", getSkill)
  .post("/", protect, insertSkill)
  .put("/:id", protect, updateSkill)
  .delete("/:id", protect, deleteSkill);

module.exports = router;
