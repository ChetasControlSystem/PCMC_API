const express = require('express');
const pcmc = require('../controllers/pcmc');
const { validate } = require('../middleware/validation-helper');
const { whitelistMiddleware } = require("../middleware/whitelisting-helper")
const router = express.Router();


router.get("/", pcmc.data)

module.exports = router;
