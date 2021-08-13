const db = require("../models");
const Category = db.category;
const Menu = db.menu;
const Op = db.Sequelize.Op;

//Add Category
exports.addCategory = async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  try {
    let newCategory = await Category.create(req.body);
    if (req.body.menu.length > 0) {
      req.body.menu.forEach((data, key) => {
        data.categoryId = newCategory.id;
      });
      let newMenu = await Menu.bulkCreate(req.body.menu);
      console.log(newMenu);
    }
    await res.json({
      status: 1,
      message: "Category Added.",
      data: newCategory,
    });
  } catch (error) {
    res.json({
      status: -1,
      message: "Error occured while Adding Category",
      error: error,
    });
  }
};

//Get All Category
exports.getAllCategory = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  Category.findAll({ include: ["menu"], order: [["id", "DESC"]] })
    .then((result) => {
      res.json({
        status: 1,
        message: "All Category fetched successfully",
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
exports.getAllCategoryDropDown = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  //{attributes: [ ['contractTypeName', 'Name'], 'createdBy']}
  Category.findAll({
    attributes: ["id", "repairType", "isActive"],
    order: [["id", "DESC"]],
  })
    .then((result) => {
      res.json({
        status: 1,
        message: "All Category fetched successfully",
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
//Get Category by Id
exports.getCategoryById = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  Category.findByPk(id)
    .then((result) => {
      res.json({
        status: 1,
        message: "Category by Id fetched successfully",
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

///Update Category
exports.updateCategory = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  Category.update(req.body, { returning: true, where: { id } })
    .then((data) => {
      res.json({
        status: 1,
        message: "Category Updated",
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

//Delete Category
exports.deleteCategory = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  Category.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          status: 1,
          message: "Category was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Category with id=${id}. Maybe Category was not found!`,
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
