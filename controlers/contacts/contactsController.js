const { Contact } = require("../../schemas/mongoSchemaAndModel");
const { NotFound } = require("http-errors");

const getContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite ? { owner, favorite } : { owner };
  const result = await Contact.find(filter, null, { skip, limit }).populate(
    "owner",
    "email subscription"
  );
  res.status(200).json(result);
};

const getContact = async (req, res, _) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound("Not found");
  }
  res.status(200).json(contact);
};

const createContact = async (req, res, _) => {
  const { _id: owner } = req.user;
  const contact = await Contact.create({ ...req.body, owner });
  res.status(201).json(contact);
};

const deleteContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) {
    throw new NotFound("Not found");
  }
  res.status(200).json({ message: "Contact deleted successfully" });
};

const updateExistingContact = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound("Not found");
  }
  res.status(200).json(result);
};

const updateContactFavourite = async (req, res, _) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound("Not found");
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
