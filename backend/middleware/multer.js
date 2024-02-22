const multer = require("multer");
const path = require("path")
const fs = require("fs")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destinationDir = path.join(__dirname, '../fileContent/temp');
    
      // Create the directory if it doesn't exist
      if (!fs.existsSync(destinationDir)) {
        fs.mkdirSync(destinationDir, { recursive: true });
      }
  
      cb(null, destinationDir)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
exports.upload = multer({ storage: storage })