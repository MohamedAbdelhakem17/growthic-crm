const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const BranchModel = require("../../../models/branches.model");

// @desc    Create a new branch
// @route   POST /api/v1/branches
// @access  private (manager only)
const createBranch = asyncHandler(async (req, res) => {
  const { name, location, front_desk } = req.body;

  const newBranch = await BranchModel.create({ name, location, front_desk });

  if (!newBranch) {
    throw new AppError(500, httpStatus.FAIL, "Failed to create branch", null);
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "Branch created successfully",
    data: newBranch,
  });
});

// @desc    Get all branches
// @route   GET /api/v1/branches
// @access  private (manager only)
const getBranches = asyncHandler(async (req, res) => {
  const branches = await BranchModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Branches fetched successfully",
    data: branches,
  });
});

// @desc    Get a single branch
// @route   GET /api/v1/branches/:id
// @access  private (manager only)
const getBranch = asyncHandler(async (req, res) => {
  const branch = await BranchModel.findById(req.params.id);

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Branch fetched successfully",
    data: branch,
  });
});

// @desc    Update a branch
// @route   PUT /api/v1/branches/:id
// @access  private (manager only)
const updateBranch = asyncHandler(async (req, res) => {
  const { name, location, front_desk } = req.body;

  const updatedBranch = await BranchModel.findByIdAndUpdate(
    req.params.id,
    { name, location, front_desk },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Branch updated successfully",
    data: updatedBranch,
  });
});

// @desc    Delete a branch
// @route   DELETE /api/v1/branches/:id
// @access  private (manager only)
const deleteBranch = asyncHandler(async (req, res) => {
  await BranchModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Branch deleted successfully",
    data: null,
  });
});

module.exports = {
  createBranch,
  getBranches,
  getBranch,
  updateBranch,
  deleteBranch,
};
