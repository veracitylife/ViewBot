const fs = require("fs");
const path = require("path");
global.app_path = path.join(__dirname);

require("../main/server.cjs");


startFullServer().then(() => {
    console.log("Headless server started successfully")
})
