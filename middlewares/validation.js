function validation(schema) {
  return (req, res, next) => {
    // if (Object.keys(req.body).length === 0) {
    //   return res.status(400).json({ message: "missing fields" });
    // }

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
