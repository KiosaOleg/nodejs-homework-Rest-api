// const validation = (schema) => {
//   return (req, res, next) => {
//     const { error } = schema.validate(req.body);
//     if (error) {
//       error.status = 400;
//       next(error);
//     }
//     next();
//   };
// };

// module.exports = validation;

function validation(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      error.status = 400;
      return res
        .status(400)
        .json({ error: error.details.map((err) => err.message).join(", ") });
    }

    next();
  };
}

module.exports = validation;
