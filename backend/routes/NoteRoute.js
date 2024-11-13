const express = require("express");

const router = express.Router();

const NoteController = require("../controllers/NoteController");



router.post("/createNote", NoteController.createNote);

router.get("/ViewNote", NoteController.ViewNote);

router.delete("/deleteNote/:id", NoteController.deleteNote);

router.put("/updateNote/:id", NoteController.updateNote);



module.exports = router;  