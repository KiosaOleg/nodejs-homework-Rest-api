const { Contact } = require("../schemas/mongoSchemaAndModel");
const { NotFound } = require("http-errors");

const getContacts = async (__, res, _) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getContact = async (req, res, _) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound(404, "Not found");
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, _) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound(404, "Not found");
  }
  res.status(200).json({ message: "Contact deleted successfully" });
};

const updateExistingContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(404, "Not found");
  }
  res.status(200).json(result);
};

const updateContactFavourite = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(404, "Not found");
  }
  res.status(200).json(result);
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateExistingContact,
  updateContactFavourite,
};
