// 1. importar la librería - npm install nodemailer
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid');

exports.run = async (email, name) => {
  var options = {
    apiKey:
      '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'
  };

  // 2. Crear el transport (Fake - Ethereal, Gmail, Sendgrid, MailGun, Postmark)
  let transporter = nodemailer.createTransport(sgTransport(options));

  // 3. Send Email
  let info = await transporter.sendMail({
    from: '"Jose Herrera" <jherrera.fundacioncerteza@gmail.com>', // sender address
    to: `${email}`, // list of receivers
    subject: 'Registro exitoso', // Subject line
    text: `Hola, ${name}, bienvenido! Prueba realizada por Jose y Augusto.` // plain text body
  });
};
