const express = require("express");

const router = express.Router();

const contactsController = require("../../controlers/contactsController");

const { validation, ctrlWrapper } = require("../../middlewares");

const { contactsSchema, statusSchema } = require("../../schemas");

const validateMiddleware = validation(contactsSchema);

// const updateValidateMiddleware = validation(updateSchema);
const updateFavoriteMiddleware = validation(statusSchema);

router.get("/", ctrlWrapper(contactsController.getContacts));

router.get("/:contactId", ctrlWrapper(contactsController.getContact));

router.post(
  "/",
  validateMiddleware,
  ctrlWrapper(contactsController.createContact)
);

router.delete("/:contactId", ctrlWrapper(contactsController.deleteContact));

router.put(
  "/:contactId",
  validateMiddleware,
  // updateValidateMiddleware,
  ctrlWrapper(contactsController.updateExistingContact)
);

router.patch(
  "/:contactId",
  // validateMiddleware,
  updateFavoriteMiddleware,
  ctrlWrapper(contactsController.updateContactFavourite)
);

module.exports = router;
