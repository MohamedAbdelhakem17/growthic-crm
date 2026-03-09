const express = require("express");

const { addNotes, getNotes } = require("../controller/notes.controller");

const {
  createNoteValidator,
} = require("../../../libs/validators/notes.validator");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

const router = express.Router();

router.use(isLoggedIn, allowedTo(SYSTEM_ROLES.SALES));

router.route("/").post(createNoteValidator, addNotes).get(getNotes);

module.exports = router;
