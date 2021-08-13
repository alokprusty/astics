// const schemas = require("../utility/RequestValidators/schema");
// const { authToken, verifyToken } = require("../config/verifyAccess");
// const middleware = require("../utility/RequestValidators/ValidationMiddleware");
module.exports = (app) => {
  const category = require("../controllers/category.controller");

  //create
  app.post("/api/category/addCategory", category.addCategory);

  //Get all
  app.get("/api/category/getAllCategory", category.getAllCategory);

  //   // app.get("/api/v1/category/addMultiplePort", category.addMultiplePort);

  //   app.get("/api/v1/category/getAllPortDropDown", category.getAllPortDropDown);

  //   //Get by Id
  //   app.get("/api/v1/category/getPortById/:id", category.getPortById);

  //   //Update
  //   app.put("/api/v1/category/updatePort/:id", category.updatePort);

  //   //Delete
  //   app.delete("/api/v1/category/deletePort/:id", category.deletePort);
};
