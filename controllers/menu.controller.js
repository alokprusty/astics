const db = require("../models");
const Menu = db.menu;
const Op = db.Sequelize.Op;

const helper = require("../config/uploadConfig");
const multer = require("multer");

//Add Menu
exports.addMenu = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    var uploadAssetCertificates = multer({
      storage: helper.GetStorage("categoryImage"),
      limits: {
        fileSize: helper.GetUploadSize(1),
      },
      // fileFilter: helper.FilterUploadType('docs')
    }).single("categoryImage");

    uploadAssetCertificates(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        await res.json({
          status: -1,
          message: "Error occured while Uploading image file of Menu",
          error: err,
        });
      } else if (err) {
        await res.json({
          status: -1,
          message: "Error occured while uploading image file of Menu",
          error: err,
        });
      } else if (!req.file) {
        let newMenu = await Menu.create(req.body);
        await res.json({
          status: 1,
          message: "Menu Added without file.",
          data: newMenu,
        });
      } else {
        const imageUrl = req.file;
        console.log(imageUrl.path);
        console.log(req.body);
        console.log(" Everything went fine.");
        req.body.fileUrl =
          "http://localhost:3001/images/" + imageUrl.path.slice(8);
        let newMenu = await Menu.create(req.body);
        await res.json({
          status: 1,
          message: "Menu Added with File.",
          data: newMenu,
        });
      }
    });
  } catch (error) {
    res.json({
      status: -1,
      message: "Error occured while Adding Menu",
      error: error,
    });
  }
};

//Get All Menu
exports.getAllMenu = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  Menu.findAll({ include: ["menu"], order: [["id", "DESC"]] })
    .then((result) => {
      res.json({
        status: 1,
        message: "All Menu fetched successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: -1,
        message: "error occured",
        error: err,
      });
    });
};

//Get Menu by Id
exports.getMenuById = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  Menu.findByPk(id)
    .then((result) => {
      res.json({
        status: 1,
        message: "Menu by Id fetched successfully",
        data: result,
      });
    })
    .catch((err) => {
      res.json({
        status: -1,
        message: "error occured",
        error: err,
      });
    });
};

///Update Menu
exports.updateMenu = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  Menu.update(req.body, { returning: true, where: { id } })
    .then((data) => {
      res.json({
        status: 1,
        message: "Menu Updated",
      });
    })
    .catch((err) => {
      res.json({
        status: -1,
        message: "error occured",
        error: err,
      });
    });
};

//Delete Menu
exports.deleteMenu = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  Menu.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          status: 1,
          message: "Menu was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Menu with id=${id}. Maybe Menu was not found!`,
        });
      }
    })
    .catch((err) => {
      res.json({
        status: -1,
        message: "error occured",
        error: err,
      });
    });
};
