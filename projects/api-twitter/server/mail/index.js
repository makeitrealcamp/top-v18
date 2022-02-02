const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid");

exports.sendEmail = async (username, email) => {
  var options = {
    apiKey: process.env.API_KEY_SENDGRID,
  };

  // Sengrid Secret API Key
  // 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

  let transporter = nodemailer.createTransport(sgTransport(options));

  let info = await transporter.sendMail({
    from: `'Michael Sanabria' <${process.env.FROM_SENDGRID_EMAIL}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Correo de prueba", // Subject line
    text: "Prueba Sendgrid NodeJs", // plain text body
    html: `<b>Hola, ${username} bienvenido a Twitter. Gracias por Registrarte.</b>`, // html body
  });
};
