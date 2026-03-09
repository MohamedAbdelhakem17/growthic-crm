const asyncHandler = require("express-async-handler");

const AppError = require("../../../libs/utils/app-error");
const httpStatus = require("../../../libs/constant/http-status.constant");
const NotesModel = require("../../../models/notes-model");

// @desc    Add a new note
// @route   POST /api/v1/notes
// @access  private (logged in sells)
const addNotes = asyncHandler(async (req, res) => {
  const { content } = req.body;

  const newNote = await NotesModel.create({
    content,
    user: req.user._id,
  });
  if (!newNote) {
    throw new AppError(500, httpStatus.FAIL, "Failed to add note", null);
  }

  res.status(201).json({
    status: httpStatus.SUCCESS,
    message: "Note added successfully",
    data: newNote,
  });
});

// @desc    get all  note
// @route   get /api/v1/notes
// @access  private (logged in sells)
const getNotes = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const skip = (page - 1) * limit;

  const notes = await NotesModel.find({ user: req.user._id })
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await NotesModel.countDocuments({ user: req.user._id });

  if (!notes) {
    throw new AppError(500, httpStatus.FAIL, "Failed to get notes", null);
  }

  res.status(200).json({
    status: httpStatus.SUCCESS,
    message: "Notes retrieved successfully",
    data: notes,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
  });
});

module.exports = {
  addNotes,
  getNotes,
};
