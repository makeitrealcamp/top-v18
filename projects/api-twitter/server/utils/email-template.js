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
  // retorna el HTML de recuperar contraseña
}

module.exports = {
  welcomeHtmlTemplate,
  welcomeTextTemplate,
  recoverPasswordTemplate,
};
