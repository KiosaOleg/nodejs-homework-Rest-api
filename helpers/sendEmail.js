const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "kiosaolegg@gmail.com" };
    await sgMail.send(email);
    console.log("Электронное письмо успешно отправлено:", email);
    return true;
  } catch (error) {
    console.error("Ошибка отправки электронной почты:", error.message);
    throw error.message;
  }
};

// const sendEmail = async (data) => {
//   try {
//     const email = { ...data, from: "barabashsan4ik@gmail.com" };
//     await sgMail.send(email);
//     return true;
//   } catch (error) {
//     throw error.message;
//   }
// };

module.exports = sendEmail;
