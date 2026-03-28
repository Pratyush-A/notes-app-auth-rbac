const noteModel = require("../models/note.models");
const { noteSchema } = require("../validators/note.validator");


async function createNote(req, res) {
  try {
    const { title, description } = req.body;
    const userId = req.user.id;


    const { error } = noteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }


    const newNote = await noteModel.create({
      user_id: userId,
      title,
      description
    });

    return res.status(201).json({
      message: "Note created successfully",
      note: newNote
    });

  } catch (error) {
    console.error("Error creating note:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}



async function getNotes(req, res) {
  try {
    const userId = req.user.id;

    const notes = await noteModel.find({ user_id: userId });

    return res.status(200).json({ notes });

  } catch (error) {
    console.error("Error fetching notes:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}



async function getAllNotes(req, res) {
  try {
    const notes = await noteModel
      .find()
      .populate("user_id", "username email");

    return res.status(200).json({ notes });

  } catch (error) {
    console.error("Error fetching all notes:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}



async function updateNote(req, res) {
  try {
    const noteId = req.params.id;
    const { title, description } = req.body;


    const { error } = noteSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }

    const note = await noteModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }


    if (
      note.user_id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    note.title = title;
    note.description = description;

    await note.save();

    return res.status(200).json({
      message: "Note updated successfully",
      note
    });

  } catch (error) {
    console.error("Error updating note:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}



async function deleteNote(req, res) {
  try {
    const noteId = req.params.id;

    const note = await noteModel.findById(noteId);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    await noteModel.findByIdAndDelete(noteId);

    return res.status(200).json({
      message: "Note deleted successfully"
    });

  } catch (error) {
    console.error("Error deleting note:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}


module.exports = {
  createNote,
  getNotes,
  getAllNotes,
  updateNote,
  deleteNote
};