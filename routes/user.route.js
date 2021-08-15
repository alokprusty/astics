module.exports = (app) => {
  const user = require("../controllers/user.controller");

  //create
  app.post("/api/user/addUser", user.addUser);

  //Get all
  app.post("/api/user/loginUser", user.loginUser);
};
