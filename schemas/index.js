const contactsSchema = require("./contacts");
const Contact = require("./mongoSchemaAndModel");
const statusSchema = require("./statusFavoriteSchema");
// const updateSchema = require("./updateContact");

module.exports = {
  contactsSchema,
  Contact,
  statusSchema,
  // updateSchema,
};
