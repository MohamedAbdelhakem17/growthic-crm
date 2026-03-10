const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const ServiceModel = require("../../../models/services.model");

// @desc    Create a new service
// @route   POST /api/v1/services
// @access  private (manager only)
const createService = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newService = await ServiceModel.create({ name });

  if (!newService) {
    throw new AppError(500, httpStatus.FAIL, "Failed to create service", null);
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "Service created successfully",
    data: newService,
  });
});

// @desc    Get all services
// @route   GET /api/v1/services
// @access  private (manager only)
const getServices = asyncHandler(async (req, res) => {
  const services = await ServiceModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Services fetched successfully",
    data: services,
  });
});

// @desc    Get a single service
// @route   GET /api/v1/services/:id
// @access  private (manager only)
const getService = asyncHandler(async (req, res) => {
  const service = await ServiceModel.findById(req.params.id);

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Service fetched successfully",
    data: service,
  });
});

// @desc    Update a service
// @route   PUT /api/v1/services/:id
// @access  private (manager only)
const updateService = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const updatedService = await ServiceModel.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Service updated successfully",
    data: updatedService,
  });
});

// @desc    Delete a service
// @route   DELETE /api/v1/services/:id
// @access  private (manager only)
const deleteService = asyncHandler(async (req, res) => {
  await ServiceModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Service deleted successfully",
    data: null,
  });
});

module.exports = {
  createService,
  getServices,
  getService,
  updateService,
  deleteService,
};
