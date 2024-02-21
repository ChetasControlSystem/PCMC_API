const os = require('os');
const allowedIPs = ['192.168.50.15', '192.168.1.1'];

let whitelisting_helper = {
    
     whitelistMiddleware : async(req, res, next) => {
        const networkInterfaces = os.networkInterfaces();
        let localIP;
        for (const ifaceName in networkInterfaces) {
          const iface = networkInterfaces[ifaceName];
          for (const details of iface) {
            if (!details.internal && details.family === 'IPv4') {
              localIP = details.address;
              break;
            }
          }
          if (localIP) break;
        }
        
          if (allowedIPs.includes(localIP)) {
            next();
          } else {
            res.status(403).send('Forbidden: Your IP is not allowed');
          }
}
}

module.exports = whitelisting_helper
