require("dotenv").config({ path: "./config/config.env" });
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("Token received:", authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).send("A token is required for authentication");
  }

  const token = authHeader.split(" ")[1];
  console.log("Extracted token:", token);

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log("Decoded token:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(401).send("Invalid Token");
  }
}

module.exports = verifyToken;
