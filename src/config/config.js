const config = {}
const dotenv = require("dotenv");
const path = require("path");
const fs = require('fs');
const envfile = path.resolve(__dirname,`../../.env`)

if (fs.existsSync(envfile)) {
    dotenv.config()
}

config.app = {
    name: "Getir Node.js Challenge",
    connectivityCheckURL: process.env.CONNECTIVITY_CHECK_URL || 'https://www.google.com/',
    env: process.env.NODE_ENV|| 'development',
    port: process.env.PORT || 3000,
    logLevel: process.env.APP_LOG_LEVEL || 'debug',
}

//db settings
config.db = {
    url: process.env.MONGODB_URL || 'mongodb://localhost:27017/getir-nodejs-endpoint',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
      poolSize: parseInt(process.env.MONGODB_CON_POOL_SIZE) || 5
    }
}

// API configs
config.api = {
  
};

module.exports = config;
