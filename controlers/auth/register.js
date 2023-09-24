const { Conflict } = require("http-errors");
const { User } = require("../../models");
const { v4: uuidv4 } = require("uuid");
const { sendEmail } = require("../../helpers");

const gravatar = require("gravatar");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw new Conflict(` ${email} in use`);
  }

  const verificationToken = uuidv4();

  const avatarURL = gravatar.url(email);

  const newUser = new User({ email, avatarURL, verificationToken });

  newUser.setPassword(password);

  await newUser.save();
  const mail = {
    to: email,
    subject: "Підтвердження email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}" >Натисніть email</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    RequestBody: {
      email,
      subscription: "starter",
      avatarURL,
      verificationToken,
    },
  });
  console.log(`user ${email}, successfully created!`);
};

module.exports = register;
