// 1. importar la librería - npm install nodemailer
const nodemailer = require("nodemailer")

async function run() {
  let testAccount = await nodemailer.createTestAccount();

  // 2. Crear el transport (Fake - Ethereal, Gmail, Sendgrid, MailGun, Postmark)
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // 3. Send Email
  let info = await transporter.sendMail({
    from: '"German" <german@example.com>', // sender address
    to: 'bar@example.com, baz@example.com', // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

run()
  .then(() => console.log("Correo enviado"))
  .catch(e => console.log(e))
