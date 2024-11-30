const express = require('express');

const router = express.Router();

const requestController = require("../controllers/requestController");

const {authenticateUser , authorizeRoles} = require('../middleware/auth');


router.post("/createRequest",
    //  authenticateUser , authorizeRoles('admin'),
      requestController.createRequest);

router.get("/getRequest",
    //  authenticateUser , authorizeRoles('admin'),
      requestController.getRequest);

router.delete("/deleteRequest/:id",
    //  authenticateUser , authorizeRoles('admin'),
      requestController.deleteRequest);

router.put("/updateRequest/:id",
    //  authenticateUser , authorizeRoles('admin'),
      requestController.updateRequest);


module.exports = router;