const express = require("express");

const { auth, ctrlWrapper } = require("../../middlewares");
const { user: ctrl } = require("../../controlers");

const router = express.Router();

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

module.exports = router;
