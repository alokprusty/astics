const verifyToken = require("../config/verifyToken");
module.exports = (app) => {
  const category = require("../controllers/category.controller");

  //create
  app.post("/api/category/addCategory", verifyToken, category.addCategory);

  //Get all
  app.get("/api/category/getAllCategory", verifyToken, category.getAllCategory);

  app.get(
    "/api/category/getMenyByCategoryId/:id",
    verifyToken,
    category.getMenyByCategoryId
  );
};
