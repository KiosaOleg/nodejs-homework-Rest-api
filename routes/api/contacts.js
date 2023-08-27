const express = require("express");

const router = express.Router();

const contactsController = require("../../controlers/contactsController");

const { validation, ctrlWrapper } = require("../../middlewares");

const { contactsSchema } = require("../../schemas");

const validateMiddleware = validation(contactsSchema);

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
  ctrlWrapper(contactsController.updateExistingContact)
);

module.exports = router;
