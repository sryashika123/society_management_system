const express = require('express');

const router = express.Router();

const security_protocol_Controller = require("../controllers/security_protocol_Controller");



router.post("/create_security_protocol", security_protocol_Controller.create_security_protocol);

router.get("/get_security_protocol", security_protocol_Controller.get_security_protocol)

router.delete("/delete_security_protocol/:id", security_protocol_Controller.delete_security_protocol)

router.put("/update_security_protocol/:id", security_protocol_Controller.update_security_protocol);


module.exports = router;