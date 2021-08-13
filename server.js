"use strict";
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors()); // For allowing Cross-Origin-Resource-Sharing
app.options("*", cors()); // For allowing Cross-Origin-Resource-Sharing for every type of HTTP Method
app.use(express.json({ limit: "25mb", extended: true }));

//////////////////////*****Sequelize Start*****//////////////////////////
const db = require("./models");
// db.sequelize.sync({ force: false }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//////////////////////*****Sequelize End*****//////////////////////////

require("./routes/user.route")(app); //Importing User Routes
require("./routes/category.route")(app); //Importing Category Routes

app.get("/demo", (req, res) => {
  res.send("Demo Working in ISO Tank");
});

app.get("*", function (req, res) {
  res.status(404).send("Invalid URL");
});

var server = app.listen(process.env.PORT || "3001", function () {
  console.log("Server running on port ", server.address().port);
});

// Task Detail
//1 Create a form that can add a user with a username and password
//2 Create a login functionality with the User table.
//3 Create a Menu for the restaurant.
//    User can add categories of Menu( i.e. Pizza, Pasta, etc.)
//    User can add an item for that category (for example, in the Pizza category, there could be margarita Pizza, Cheese Pizza, Italian Pizza, etc.)
//    Alos users can upload a photo of that item
//4 create an API to get category
//5 create API to get menu items by category
// Steps 3, 4, and 5 should not allow without a login. 8. Check authentication before performing any request. Unauthorized users should redirect to the login page.
