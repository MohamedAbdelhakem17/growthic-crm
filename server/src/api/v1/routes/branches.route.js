const express = require("express");

const {
  createBranch,
  getBranches,
  getBranch,
  updateBranch,
  deleteBranch,
} = require("../controller/branches.controller");

const {
  createBranchValidator,
  updateBranchValidator,
  deleteBranchValidator,
  getBranchValidator,
} = require("../../../libs/validators/branches.validator");

const isLoggedIn = require("../../../middleware/auth.middleware");
const allowedTo = require("../../../middleware/allowedTo.middleware");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

const router = express.Router();

router.use(isLoggedIn, allowedTo(SYSTEM_ROLES.MANAGER));

router.route("/").get(getBranches).post(createBranchValidator, createBranch);

router
  .route("/:id")
  .get(getBranchValidator, getBranch)
  .put(updateBranchValidator, updateBranch)
  .delete(deleteBranchValidator, deleteBranch);

module.exports = router;
