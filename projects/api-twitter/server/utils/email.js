const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');
const config = require('../config');

exports.run = async (email, name) => {
  var options = {
    apiKey: config.email.sendgridApiKey
  };

  let transporter = nodemailer.createTransport(sgTransport(options));

  let info = await transporter.sendMail({
    from: '"Jose Herrera" <jherrera.fundacioncerteza@gmail.com>',
    to: `${email}`,
    subject: 'Registro exitoso',
    text: `Hola, ${name}, bienvenido!`
  });
};
