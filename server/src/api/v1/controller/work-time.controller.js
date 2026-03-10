const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const WorkTimeModel = require("../../../models/work-time.model");

// @desc    Create a new work time
// @route   POST /api/v1/work-times
// @access  private (manager only)
const createWorkTime = asyncHandler(async (req, res) => {
  const { day, start_time, end_time } = req.body;

  const newWorkTime = await WorkTimeModel.create({ day, start_time, end_time });

  if (!newWorkTime) {
    throw new AppError(
      500,
      httpStatus.FAIL,
      "Failed to create work time",
      null,
    );
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "Work time created successfully",
    data: newWorkTime,
  });
});

// @desc    Get all work times
// @route   GET /api/v1/work-times
// @access  private (manager only)
const getWorkTimes = asyncHandler(async (req, res) => {
  const workTimes = await WorkTimeModel.find().sort({ day: 1 });

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Work times fetched successfully",
    data: workTimes,
  });
});

// @desc    Get a single work time
// @route   GET /api/v1/work-times/:id
// @access  private (manager only)
const getWorkTime = asyncHandler(async (req, res) => {
  const workTime = await WorkTimeModel.findById(req.params.id);

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Work time fetched successfully",
    data: workTime,
  });
});

// @desc    Update a work time
// @route   PUT /api/v1/work-times/:id
// @access  private (manager only)
const updateWorkTime = asyncHandler(async (req, res) => {
  const { day, start_time, end_time } = req.body;

  const updatedWorkTime = await WorkTimeModel.findByIdAndUpdate(
    req.params.id,
    { day, start_time, end_time },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Work time updated successfully",
    data: updatedWorkTime,
  });
});

// @desc    Delete a work time
// @route   DELETE /api/v1/work-times/:id
// @access  private (manager only)
const deleteWorkTime = asyncHandler(async (req, res) => {
  await WorkTimeModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Work time deleted successfully",
    data: null,
  });
});

module.exports = {
  createWorkTime,
  getWorkTimes,
  getWorkTime,
  updateWorkTime,
  deleteWorkTime,
};
