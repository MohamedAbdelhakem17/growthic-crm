const express = require("express");

const {
  createDisqualifiedReason,
  getDisqualifiedReasons,
  updateDisqualifiedReason,
  deleteDisqualifiedReason,
} = require("../controller/disqualified-reasons.controller");

const {
  createDisqualifiedReasonValidator,
  updateDisqualifiedReasonValidator,
  deleteDisqualifiedReasonValidator,
} = require("../../../libs/validators/disqualified-reasons.validator");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

const router = express.Router();

router.use(isLoggedIn);

router
  .route("/")
  .get(
    allowedTo(SYSTEM_ROLES.MANAGER, SYSTEM_ROLES.SALES),
    getDisqualifiedReasons,
  )
  .post(
    allowedTo(SYSTEM_ROLES.MANAGER),
    createDisqualifiedReasonValidator,
    createDisqualifiedReason,
  );

router.use(allowedTo(SYSTEM_ROLES.MANAGER));
router
  .route("/:id")
  .put(updateDisqualifiedReasonValidator, updateDisqualifiedReason)
  .delete(deleteDisqualifiedReasonValidator, deleteDisqualifiedReason);

module.exports = router;
