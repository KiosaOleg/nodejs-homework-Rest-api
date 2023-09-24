const contactsSchema = require("./contacts");
const Contact = require("./mongoSchemaAndModel");
const statusSchema = require("./statusFavoriteSchema");
const { verifyEmailSchema } = require("./verifyEmailSchema");

module.exports = {
  contactsSchema,
  Contact,
  statusSchema,
  verifyEmailSchema,
};
