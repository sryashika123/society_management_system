const express = require("express");

const router = express.Router();

const pollController = require("../controllers/PollController");



router.post("/createPoll", pollController.createPoll);

router.get("/getPoll", pollController.getPoll);

router.delete("/deletePoll/:id", pollController.deletePoll);


module.exports = router;