const express = require("express");

const router = express.Router();

const leadsController = require("../controller/leads.controller");
const leadsValidators = require("../../../libs/validators/leads.validators");

router
  .route("/")
  .post(leadsValidators.createLeadValidator, leadsController.createLead);

router
  .route("/:id")
  .get(leadsValidators.getSingleLeadValidator, leadsController.getSingleLead)
  .put(leadsValidators.updateLeadValidator, leadsController.updateLead);

module.exports = router;
