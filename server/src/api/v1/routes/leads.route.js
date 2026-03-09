const express = require("express");

const router = express.Router();

const leadsController = require("../controller/leads.controller");
const leadsValidators = require("../../../libs/validators/leads.validators");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

router
  .route("/")
  .post(leadsValidators.createLeadValidator, leadsController.createLead);

router.use(isLoggedIn, allowedTo(SYSTEM_ROLES.SALES));
router
  .route("/:id")
  .get(leadsValidators.getSingleLeadValidator, leadsController.getSingleLead)
  .put(leadsValidators.updateLeadValidator, leadsController.updateLead);

module.exports = router;
