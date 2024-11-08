const express = require("express");

const router = express.Router();

const compalintController = require("../controllers/CompalintController");


router.post("/createComplaints", compalintController.createComplaints);

router.get("/viewComplaints", compalintController.viewComplaints);

router.delete("/deleteComplaints/:id", compalintController.deleteComplaints);

router.put("/updateComplaints/:id", compalintController.updateComplaints);


module.exports = router;  