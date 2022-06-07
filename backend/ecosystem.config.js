const path = require('path');

module.exports = {
  "apps" : [
    {
      "name": "vmachine-backend",
      "cwd": __dirname,
      "script": "./bin/www",
      "exec_mode": "fork",
      "instances": 1,
      "watch": false,
      "output": "/dev/null",
      "error": "/dev/null",
      "log": "/dev/null",
      "merge_logs": true,
      "env": {
        "NODE_ENV": "production"
      },
      "env_production" : {
        "NODE_ENV": "production"
      }
    }
  ]
};
