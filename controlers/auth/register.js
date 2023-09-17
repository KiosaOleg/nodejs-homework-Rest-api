const { Conflict } = require("http-errors");

const { User } = require("../../models");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(` ${email} in use`);
  }
  const newUser = new User({ email });
  newUser.setPassword(password);
  newUser.save();

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
  console.log(`user ${email}, successfully created!`);
};

module.exports = register;
