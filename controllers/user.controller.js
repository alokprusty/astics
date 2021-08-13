const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtsecretkey = "astics";
const User = db.user;
const Op = db.Sequelize.Op;

//Add User
exports.addUser = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  req.body.password = bcrypt.hashSync(req.body.password, 9);
  User.create(req.body)
    .then((data) => {
      res.json({
        status: 1,
        message: "User Added.",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: -1,
        message: "Error occured while Adding User",
        error: err,
      });
    });
};

//Add User
exports.loginUser = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  User.findOne({ where: { username: req.body.username } })
    .then((user) => {
      if (user != null) {
        bcrypt.compare(
          req.body.password,
          user.password,
          function (hashError, hashRes) {
            if (hashError) {
              res.json({
                status: -1,
                message: "error occured",
                error: err,
              });
            } else if (hashRes == true) {
              jwt.sign(
                {
                  uid: user.id,
                },
                jwtsecretkey,
                {
                  expiresIn: 60 * 600,
                },
                (err, token) => {
                  console.log(token);
                  res.json({
                    status: 1,
                    message: "Login Successful",
                    token: token,
                    userId: user.id,
                  });
                }
              );
            } else {
              res.json({
                status: 0,
                message: "Incorrect Password",
              });
            }
          }
        );
      } else {
        res.json({
          status: -1,
          message: "Invalid Username.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: -1,
        message: "Error occured while Adding User",
        error: err,
      });
    });
};

//Get All User
exports.getAllUser = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  User.findAll()
    .then((result) => {
      res.json({
        status: 1,
        message: "All User fetched successfully",
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

//Delete User
exports.deleteUser = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          status: 1,
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
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
