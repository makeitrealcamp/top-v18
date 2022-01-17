function welcomeHtmlTemplate(data) {
  return `
      <h1>Hola ${data.name},</h1>
      <p><strong>Bienvenido ...</strong></p>
    `;
}

function welcomeTextTemplate(data) {
  return `
      Hola ${data.name},
  
      Bienvenido ...
    `;
}

function recoverPasswordTemplate(data) {
  // TODO: add html for password recovery message
}

module.exports = {
  welcomeHtmlTemplate,
  welcomeTextTemplate,
  recoverPasswordTemplate,
};
