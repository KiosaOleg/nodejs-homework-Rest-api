const validation = require("./validation");
const ctrlWrapper = require("./ctrlWrapper");
const { isValidId } = require("./isValidId");

const { checkRequestBody } = require("./checkBodyFavorit");

module.exports = {
  validation,
  ctrlWrapper,
  isValidId,
  checkRequestBody,
};
