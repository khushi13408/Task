const express = require("express");
const router = express.Router();
const {signUp,login} = require("../controllers/user.controller")
// const {login} = require("../controllers/user.controller")

module.exports = () => {
  router.post("/signUp", signUp);
  router.post("/login",login)
  return router;
};