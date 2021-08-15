const multer = require("multer");
var fs = require("fs");

function GetStorage(whichPath) {
  let path = "";

  switch (whichPath) {
    case "menuImage":
      path = "menuImage";
      break;
  }
  var dir = "./uploads/" + path;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return multer.diskStorage({
    destination: function (req, file, cb) {
      // Uploads is the Upload_folder_name
      //console.log(whichPath)
      cb(null, dir + "/");
    },
    filename: function (req, file, cb) {
      //cb(null, new Date().toISOString() + "-" + file.originalname)
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
}

function GetUploadSize(size) {
  // Define the maximum size for uploading
  // picture i.e. 1 MB. it is optional

  return size * 1000 * 1000;
}

module.exports = {
  GetStorage: GetStorage,
  GetUploadSize: GetUploadSize,
};
