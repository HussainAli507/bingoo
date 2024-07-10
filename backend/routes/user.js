const express = require("express");
const { handleUserSignUp, handleUserSignin } = require("../controller/user");
const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserSignin);

module.exports = router;
