const express = require("express");

const router = express.Router();

const validation = require("../../middlewares/validation");
const contactsSchema = require("../../schemas/index");

const validateMiddleware = validation(contactsSchema);

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

// router.get("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

// router.get("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

// router.post("/", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.post("/", validateMiddleware, async (req, res, next) => {
  try {
    const newContact = req.body;
    const addedContact = await addContact(newContact);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

// router.delete("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const removedContact = await removeContact(contactId);
    if (!removedContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

// router.put("/:contactId", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

router.put("/:contactId", validateMiddleware, async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const updatedFields = req.body;
    const updatedContact = await updateContact(contactId, updatedFields);
    if (!updatedContact) {
      res.status(404).json({ message: "Contact not found" });
      return;
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
