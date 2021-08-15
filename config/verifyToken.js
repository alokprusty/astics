var jwt = require("jsonwebtoken");
var tokenconfig = "astics";
var decodeTokken;
function verifyToken(req, res, next) {
  var token = req.headers["x-access-token"];
  // console.log(token)
  if (!token) return res.send({ auth: false, message: "Forbidden!!" });
  jwt.verify(token, tokenconfig, function (err, decoded) {
    if (err) return res.send({ auth: false, message: "Invalid Signature!" });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    req.role = decoded.role;
    // console.log(JSON.stringify(decoded));
    decodeTokken = decoded;
    next();
  });
}
module.exports = verifyToken;
