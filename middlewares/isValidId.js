const { isValidObjectId } = require("mongoose");

const checkRequestBody = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "missing field favorite" });
  }

  next();
};

const isValidId = (req, res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return res.status(400).json({ error: `${contactId} is not a valid id` });
  }

  next();
};

// const isValidId = (req, res, next) => {
//   const { contactId } = req.params; //
//   if (!isValidObjectId(contactId)) {
//     res.status(400).json({ error: `${contactId} is not a valid id` });
//   } else {
//     next();
//   }
// };

module.exports = {
  isValidId,
  checkRequestBody,
};

// const { isValidObjectId } = require("mongoose");

// const isValidId = (req, res, next) => {
//   const { contactId } = req.params;

//   if (!isValidObjectId(contactId)) {
//     return res.status(400).json({ error: `${contactId} is not a valid id` });
//   }

//   next();
// };

// const checkRequestBody = (req, res, next) => {
//   if (!req.body || !req.body.favorite) {
//     return res.status(400).json({ message: "missing field favorite" });
//   }

//   next();
// };

// module.exports = {
//   isValidId,
//   checkRequestBody,
// };
