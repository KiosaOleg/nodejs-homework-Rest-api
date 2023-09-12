const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { contactId } = req.params; // Изменили на contactId
  if (!isValidObjectId(contactId)) {
    res.status(400).json({ error: `${contactId} is not a valid id` });
  } else {
    next();
  }
};

module.exports = isValidId;
