const verifyToken = require("../config/verifyToken");
module.exports = (app) => {
  const menu = require("../controllers/menu.controller");

  //create
  app.post("/api/menu/addMenu", verifyToken, menu.addMenu);

  //Get all
  app.get("/api/menu/getAllMenu", verifyToken, menu.getAllMenu);
};
