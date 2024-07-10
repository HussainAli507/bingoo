// const jwt = require("jsonwebtoken");
// const secretKey = process.env.JWT_SECRET || "rgkghksfldhjksdgfiodjipxvjxdkgsv";

// function ensureAuthenticated(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.redirect("/login.html");
//   }

//   jwt.verify(token, secretKey, (err, decoded) => {
//     if (err) {
//       return res.redirect("/login.html");
//     }

//     req.user = decoded;
//     next();
//   });
// }

// module.exports = ensureAuthenticated;
