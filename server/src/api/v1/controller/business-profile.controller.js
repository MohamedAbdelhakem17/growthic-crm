const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const BusinessProfileModel = require("../../../models/business-profile.model");

// @desc    Create the business profile (only one allowed)
// @route   POST /api/v1/business-profile
// @access  private (manager only)
const createBusinessProfile = asyncHandler(async (req, res) => {
  const { name, sector, currency, language, whatsappNumber, whatsappApiKey } =
    req.body;

  const newProfile = await BusinessProfileModel.create({
    name,
    sector,
    currency,
    language,
    whatsappNumber,
    whatsappApiKey,
  });

  if (!newProfile) {
    throw new AppError(
      500,
      httpStatus.FAIL,
      "Failed to create business profile",
      null,
    );
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "Business profile created successfully",
    data: newProfile,
  });
});

// @desc    Get the business profile
// @route   GET /api/v1/business-profile
// @access  private (manager only)
const getBusinessProfile = asyncHandler(async (req, res) => {
  const profile = await BusinessProfileModel.findOne();

  if (!profile) {
    throw new AppError(
      404,
      httpStatus.FAIL,
      "Business profile not found",
      null,
    );
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Business profile fetched successfully",
    data: profile,
  });
});

// @desc    Update the business profile
// @route   PUT /api/v1/business-profile/:id
// @access  private (manager only)
const updateBusinessProfile = asyncHandler(async (req, res) => {
  const { name, sector, currency, language, whatsappNumber, whatsappApiKey } =
    req.body;

  const updated = await BusinessProfileModel.findByIdAndUpdate(
    req.params.id,
    { name, sector, currency, language, whatsappNumber, whatsappApiKey },
    { new: true, runValidators: true },
  );

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Business profile updated successfully",
    data: updated,
  });
});

// @desc    Delete the business profile
// @route   DELETE /api/v1/business-profile/:id
// @access  private (manager only)
const deleteBusinessProfile = asyncHandler(async (req, res) => {
  await BusinessProfileModel.findByIdAndDelete(req.params.id);

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Business profile deleted successfully",
    data: null,
  });
});

module.exports = {
  createBusinessProfile,
  getBusinessProfile,
  updateBusinessProfile,
  deleteBusinessProfile,
};
