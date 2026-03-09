const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const LeadsModels = require("../../../models/leads.model");

// @desc    Create a new lead
// @route   POST /api/v1/leads
// @access  Public
const createLead = asyncHandler(async (req, res) => {
  const { client_name, phone, country, service, branch, source, notes } =
    req.body;

  // Validate required fields
  if (!client_name || !phone || !country || !service || !branch) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // Create new lead
  const lead = await LeadsModels.create({
    client_name,
    phone,
    country,
    service,
    branch,
    source,
    notes,
  });

  if (!lead) {
    throw new AppError(500, httpStatus.FAIL, "Failed to create lead", null);
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "Lead created successfully",
    data: lead,
  });
});

// @desc    Update lead status
// @route   PUT /api/v1/leads/:id
// @access  Public
const updateLead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, disQualifiedReason } = req.body;

  //  edit lead
  const lead = await LeadsModels.findByIdAndUpdate(
    id,
    { status, disQualifiedReason },
    { new: true },
  );

  if (!lead) {
    throw new AppError(404, httpStatus.FAIL, "Lead not found", null);
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Lead updated successfully",
    data: lead,
  });
});

// @desc    Get single lead
// @route   GET /api/v1/leads/:id
// @access  Public
const getSingleLead = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const lead = await LeadsModels.findById(id);

  if (!lead) {
    throw new AppError(404, httpStatus.FAIL, "Lead not found", null);
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Lead retrieved successfully",
    data: lead,
  });
});

module.exports = {
  createLead,
  updateLead,
  getSingleLead,
};
