const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const LeadsModels = require("../../../models/leads.model");
const SYSTEM_ROLES = require("../../../libs/constant/system-roles.constant");

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
// @access  private (manager and sales)
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

// @desc    Get leads (all / by branch / by date)
// @route   GET /api/v1/leads
// @access  Manager: full filter | FrontDesk: own branch + date only
const getLeads = asyncHandler(async (req, res) => {
  const { branch, date } = req.query;

  const filter = {};

  // FrontDesk is locked to their own branch
  if (req.user.role === SYSTEM_ROLES.FRONT_DESK) {
    filter.branch = req.user.branch;
  } else if (branch) {
    filter.branch = branch;
  }

  // filter by date
  if (date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    filter.createdAt = {
      $gte: startOfDay,
      $lte: endOfDay,
    };
  }

  const leads = await LeadsModels.find(filter).sort({ createdAt: -1 }).lean();

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message:
      leads.length === 0 ? "No leads found" : "Leads retrieved successfully",
    results: leads.length,
    data: leads,
  });
});

module.exports = {
  createLead,
  updateLead,
  getSingleLead,
  getLeads,
};
