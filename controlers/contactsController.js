const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const newContact = req.body;
    const addedContact = await addContact(newContact);
    res.status(201).json(addedContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
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
};

const updateExistingContact = async (req, res, next) => {
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
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateExistingContact,
};
