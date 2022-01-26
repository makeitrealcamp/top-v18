// 1. import the library - npm install nodemailer
const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid");
const { textTemplate, htmlTemplate } = require("./template");

exports.mail = async function run(data) {
  var options = {
    apiKey: "",
  };

  // 2. Create transport (Fake - Ethereal, Gmail, Sendgrid, MailGun, Postmark)
  let transporter = nodemailer.createTransport(sgTransport(options));

  // 3. Send Email
  let info = await transporter
    .sendMail({
      from: '"Juan Moreno" <juan.carlos.moreno.banda@hotmail.com>', // sender address
      to: "juan.carlos.moreno.banda@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: textTemplate(data), // plain text body
      html: htmlTemplate(data), // html body
    })
    .then(() =>
      console.log(`[Success]: Mail message sended to user: ${data.id}`),
    )
    .catch((e) => console.error(`Mail send with error: ${e}`));
};
