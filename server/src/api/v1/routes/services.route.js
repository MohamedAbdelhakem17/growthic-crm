const express = require("express");

const {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
} = require("../controller/services.controller");

const {
  createServiceValidator,
  updateServiceValidator,
  deleteServiceValidator,
  getServiceValidator,
} = require("../../../libs/validators/services.validator");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

const router = express.Router();

router.use(isLoggedIn);

router
  .route("/")
  .get(allowedTo(SYSTEM_ROLES.MANAGER, SYSTEM_ROLES.SALES), getServices)
  .post(allowedTo(SYSTEM_ROLES.MANAGER), createServiceValidator, createService);

router.use(allowedTo(SYSTEM_ROLES.MANAGER));
router
  .route("/:id")
  .get(getServiceValidator, getService)
  .put(updateServiceValidator, updateService)
  .delete(deleteServiceValidator, deleteService);

module.exports = router;
