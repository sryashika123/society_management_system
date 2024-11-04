const express = require("express");

const router = express.Router();

const ImportantNumcontroller = require("../controllers/ImortantNumController");



router.post("/createImportantNum", ImportantNumcontroller.createImportantNum);

router.get("/getImportantNum", ImportantNumcontroller.getImportantNum);

router.delete("/deleteImportantNum/:id", ImportantNumcontroller.deleteImportantNum);

router.put("/updateImportantNum/:id",  ImportantNumcontroller.updateImportantNum);


module.exports = router;  