const express = require("express");

const router = express.Router();

const compalintController = require("../controllers/CompalintController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');



router.post("/createComplaints",
    //  authenticateUser , authorizeRoles('admin'),
     compalintController.createComplaints);

router.get("/viewComplaints",
    //  authenticateUser , authorizeRoles('admin'),
     compalintController.viewComplaints);

router.delete("/deleteComplaints/:id",
    //  authenticateUser , authorizeRoles('admin'),
     compalintController.deleteComplaints);

router.put("/updateComplaints/:id",
    //  authenticateUser , authorizeRoles('admin'),
     compalintController.updateComplaints);


module.exports = router;  