require("dotenv").config();
module.exports = {
    PORT: process.env.PORT,
    CONNECTION_STRING: process.env.CONNECTION_STRING,
    IMAGE_PATH : process.env.IMAGES_PATH
}