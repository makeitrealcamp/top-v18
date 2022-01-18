// 1. Import library - npm install nodemailer
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid");
const config = require("../config");
const {
  welcomeHtmlTemplate,
  welcomeTextTemplate,
} = require("./email-template");

async function sendWelcomeEmail(username, email) {
  const options = {
    apiKey: config.email.sengridApiKey,
  };

  // 2. Create transport (Fake - Ethereal, Gmail, Sendgrid, MailGun, Postmark)
  let transporter = nodemailer.createTransport(sgTransport(options));

  // 3. Send Email
  await transporter.sendMail({
    from: `"${config.email.senderEmailUsername}" <${config.email.senderEmail}>`, // sender address
    to: `${email}`, // list of receivers
    subject: `Bienvenido ${username}`, // Subject line
    text: welcomeTextTemplate({ name: `${username}` }), // plain text body
    html: welcomeHtmlTemplate({ name: `${username}` }), // html body
  });

  console.log(`[SUCCESS]: mail message sent to user ${username}`);
}

module.exports = sendWelcomeEmail;
