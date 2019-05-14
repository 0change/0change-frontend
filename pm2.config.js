require('dotenv').config();
/**
 * pm2 init command
 * pm2 start pm2.config.js
 */
module.exports = {
  "apps": [
    {
      "name": process.env.PM2_APP_NAME || "zchange-frontend",
      "script": "npm",
      "args" : "run prod"
    }
  ]
}
