const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const { isValidId } = require("./isValidId");
const auth = require("./auth");
const upload = require("./upload");

const { checkRequestBody } = require("./checkBodyFavorit");

module.exports = {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
  checkRequestBody,
  upload,
};
