const express = require("express");

const router = express.Router();

const AnnouncementController = require("../controllers/AnnouncementController");



router.post("/createAnnouncement", AnnouncementController.createAnnouncement);

router.get("/getAnnouncement", AnnouncementController.getAnnouncement)

router.delete("/deleteAnnouncement/:id", AnnouncementController.deleteAnnouncement);

router.put("/updateAnnouncement/:id", AnnouncementController.updateAnnouncement)




module.exports = router;