const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();

const { Contact } = require("../schemas");

const contactsFilePath = path.resolve(__dirname, "contacts.json");

const updateContacts = async (list) => {
  await fs.writeFile(contactsFilePath, JSON.stringify(list, null, "\t"));
};

const listContacts = async (req, res) => {
  const contacts = await Contact.find({});
  res.json(contacts);
};

const getContactById = async (contactId) => {
  const list = await listContacts();
  return list.find((contact) => contact.id === contactId);
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();

  const item = contacts.findIndex((contact) => contact.id === contactId);
  if (item === -1) {
    return null;
  }

  const [removeContact] = contacts.splice(item, 1);
  await updateContacts(contacts);
  return removeContact;
};

const addContact = async ({ name, email, phone }) => {
  const list = await listContacts();
  const newContact = { name, email, phone, id };
  list.push(newContact);
  await updateContacts(list);
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await listContacts();
  const item = contacts.findIndex((contact) => contact.id === id);
  if (item === -1) {
    return null;
  }

  contacts[item] = { id, name, email, phone };
  await updateContacts(contacts);
  return contacts[item];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
