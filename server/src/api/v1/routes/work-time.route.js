const express = require("express");

const {
  createWorkTime,
  getWorkTimes,
  getWorkTime,
  updateWorkTime,
  deleteWorkTime,
} = require("../controller/work-time.controller");

const {
  createWorkTimeValidator,
  updateWorkTimeValidator,
  deleteWorkTimeValidator,
  getWorkTimeValidator,
} = require("../../../libs/validators/work-time.validator");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

const router = express.Router();

router.use(isLoggedIn);
router.use(allowedTo(SYSTEM_ROLES.MANAGER));

router
  .route("/")
  .get(getWorkTimes)
  .post(createWorkTimeValidator, createWorkTime);

router
  .route("/:id")
  .get(getWorkTimeValidator, getWorkTime)
  .put(updateWorkTimeValidator, updateWorkTime)
  .delete(deleteWorkTimeValidator, deleteWorkTime);

module.exports = router;
