const express = require("express");

const {
  createBusinessProfile,
  getBusinessProfile,
  updateBusinessProfile,
  deleteBusinessProfile,
} = require("../controller/business-profile.controller");

const {
  createBusinessProfileValidator,
  updateBusinessProfileValidator,
} = require("../../../libs/validators/business-profile.validator");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

const router = express.Router();

router.use(isLoggedIn);
router.use(allowedTo(SYSTEM_ROLES.MANAGER));

router
  .route("/")
  .get(getBusinessProfile)
  .post(createBusinessProfileValidator, createBusinessProfile);

router
  .route("/:id")
  .put(updateBusinessProfileValidator, updateBusinessProfile)
  .delete(deleteBusinessProfile);

module.exports = router;
