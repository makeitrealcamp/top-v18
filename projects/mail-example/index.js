// 1. importar la librería - npm install nodemailer
const nodemailer = require("nodemailer")
const sgTransport = require('nodemailer-sendgrid');

async function run() {
  var options = {
    apiKey: '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'
  }

  // 2. Crear el transport (Fake - Ethereal, Gmail, Sendgrid, MailGun, Postmark)
  let transporter = nodemailer.createTransport(sgTransport(options));

  // 3. Send Email
  let info = await transporter.sendMail({
    from: '"German Escobar" <german.escobar@makeitreal.camp>', // sender address
    to: 'german.escobarc@gmail.com', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

run()
  .then(() => console.log("Correo enviado"))
  .catch(e => console.log(e))
