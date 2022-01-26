exports.htmlTemplate = function welcomeHtmlTemplate(data) {
  return `
    <h1>Hola ${data.name},</h1>
    <p><strong>Bienvenido ...</strong></p>
  `;
};

exports.textTemplate = function welcomeTextTemplate(data) {
  return `
    Hola ${data.name},
    Bienvenido ...
  `;
};
