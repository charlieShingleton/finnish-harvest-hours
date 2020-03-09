const express = require("express");

const router = express.Router();

module.exports = router;

const userControllers = require("./user.controllers");
const { wrapErrors, supportedMethods } = require("../../utils/wrappers");

router
  .route("/")
  // TODO: add isAuthenticated middleware check here
  .get(wrapErrors(userControllers.getUserData))
  .all(supportedMethods(["GET"]));
