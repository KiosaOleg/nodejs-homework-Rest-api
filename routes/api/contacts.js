const express = require("express");

const router = express.Router();

const contactsController = require("../../controlers/contacts/contactsController");

const {
  auth,
  validation,
  ctrlWrapper,
  isValidId,
  checkRequestBody,
} = require("../../middlewares");

const { contactsSchema, statusSchema } = require("../../schemas");

const validateMiddleware = validation(contactsSchema);

const updateFavoriteMiddleware = validation(statusSchema);

router.get("/", auth, ctrlWrapper(contactsController.getContacts));

router.get(
  "/:contactId",
  auth,
  isValidId,
  ctrlWrapper(contactsController.getContact)
);

router.post(
  "/",
  auth,
  validateMiddleware,
  ctrlWrapper(contactsController.createContact)
);

router.delete(
  "/:contactId",
  auth,
  isValidId,
  ctrlWrapper(contactsController.deleteContact)
);

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateMiddleware,
  ctrlWrapper(contactsController.updateExistingContact)
);

router.patch(
  "/:contactId/favorite",
  auth,
  checkRequestBody,
  isValidId,
  updateFavoriteMiddleware,
  ctrlWrapper(contactsController.updateContactFavourite)
);

module.exports = router;
