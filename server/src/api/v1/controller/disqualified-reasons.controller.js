const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const disqualifiedReasonsModel = require("../../../models/disqualified-reasons.model");

// @desc    Create a new disqualified reason
// @route   POST /api/v1/disqualified-reasons
// @access  private (manager only)
const createDisqualifiedReason = asyncHandler(async (req, res) => {
  const { reason } = req.body;

  const newReason = await disqualifiedReasonsModel.create({
    reason,
    created_by: req.user._id,
  });

  if (!newReason) {
    throw new AppError(
      500,
      httpStatus.FAIL,
      "Failed to create disqualified reason",
      null,
    );
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "Disqualified reason created successfully",
    data: newReason,
  });
});

// @desc    get disqualified  reason
// @route   get /api/v1/disqualified-reasons
// @access  private (manager and sales)
const getDisqualifiedReasons = asyncHandler(async (req, res) => {
  const reasons = await disqualifiedReasonsModel.find().lean();

  if (!reasons) {
    throw new AppError(
      500,
      httpStatus.FAIL,
      "Failed to fetch disqualified reasons",
      null,
    );
  }

  if (reasons.length === 0) {
    return res.status(200).json({
      status: httpStatus.SUCCESS,
      message: "No disqualified reasons found",
      data: [],
    });
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Disqualified reasons fetched successfully",
    data: reasons,
  });
});

// @desc    get disqualified  reason
// @route   put /api/v1/disqualified-reasons/:id
// @access  private (manager only)
const updateDisqualifiedReason = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const updatedReason = await disqualifiedReasonsModel.findByIdAndUpdate(
    id,
    { reason },
    { new: true },
  );

  if (!updatedReason) {
    throw new AppError(
      500,
      httpStatus.FAIL,
      "Failed to update disqualified reason",
      null,
    );
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Disqualified reason updated successfully",
    data: updatedReason,
  });
});

// @desc    get disqualified  reason
// @route   delete /api/v1/disqualified-reasons/:id
// @access  private (manager only)

const deleteDisqualifiedReason = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedReason = await disqualifiedReasonsModel.findByIdAndDelete(id);

  if (!deletedReason) {
    throw new AppError(
      500,
      httpStatus.FAIL,
      "Failed to delete disqualified reason",
      null,
    );
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Disqualified reason deleted successfully",
    data: null,
  });
});

module.exports = {
  createDisqualifiedReason,
  getDisqualifiedReasons,
  updateDisqualifiedReason,
  deleteDisqualifiedReason,
};
