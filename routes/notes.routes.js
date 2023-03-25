const express = require("express");
const { NoteModel } = require("../model/note.model");
const noteRouter = express.Router();
const jwt = require("jsonwebtoken");

//add notes
noteRouter.post("/add", async (req, res) => {
  const payload = req.body;
  try {
    const note = new NoteModel(payload);
    await note.save();
    res.status(200).send({ msg: "A new note has been added" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

//get the notes
noteRouter.get("/", async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, "masai");

  try {
    if (decoded) {
      const notes = await NoteModel.find({ userId: decoded.userId });
      res.status(200).send(notes);
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});


//update the notes
noteRouter.patch("/update/:noteId",async(req,res)=>{
    const payload = req.body
    const {noteId} = req.params
    try {
        await NoteModel.findByIdAndUpdate({_id:noteId},payload)
        res.status(200).send({ msg: "A note has been updated" });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

//delete the notes
noteRouter.delete("/delete/:noteId",async(req,res)=>{
    const {noteId} = req.params
    try {
        await NoteModel.findByIdAndDelete({_id:noteId})
        res.status(200).send({ msg: "A note has been deleted" });
    } catch (error) {
        res.status(400).send({ msg: error.message });
    }
})

module.exports = { noteRouter };
