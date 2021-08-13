// const schemas = require("../utility/RequestValidators/schema");
// const { authToken, verifyToken } = require("../config/verifyAccess");
// const middleware = require("../utility/RequestValidators/ValidationMiddleware");
module.exports = (app) => {
  const user = require("../controllers/user.controller");

  //create
  app.post("/api/user/addUser", user.addUser);

  //Get all
  app.post("/api/user/loginUser", user.loginUser);

  //   // app.get("/api/v1/user/addMultiplePort", user.addMultiplePort);

  //   app.get("/api/v1/user/getAllPortDropDown", user.getAllPortDropDown);

  //   //Get by Id
  //   app.get("/api/v1/user/getPortById/:id", user.getPortById);

  //   //Update
  //   app.put("/api/v1/user/updatePort/:id", user.updatePort);

  //   //Delete
  //   app.delete("/api/v1/user/deletePort/:id", user.deletePort);
};
