const express = require('express');
const pcmc = require('../controllers/pcmc');
const { validate } = require('../middleware/validation-helper');
const router = express.Router();

const allowedIPs = ['192.168.128.15', '192.168.1.1'];

const whitelistMiddleware = (req, res, next) => {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
    console.log(clientIP, "+++++++++++++++++++++++");
  
    // If x-forwarded-for header is present, split and get the first IP (client IP)
    const firstIP = clientIP.split(',')[0].trim();
  
    if (allowedIPs.includes(firstIP)) {
      next();
    } else {
      res.status(403).send('Forbidden: Your IP is not allowed');
    }
  };

router.get("/", pcmc.data)

module.exports = router;
