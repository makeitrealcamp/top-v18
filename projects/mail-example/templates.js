export function welcomeHtmlTemplate(data) {
  return `
    <h1>Hola ${data.name},</h1>
    <p><strong>Bienvenido ...</strong></p>
  `
}

export function welcomeTextTemplate(data) {
  return `
    Hola ${data.name},

    Bienvenido ...
  `
}

export function recoverPasswordTemplate(data) {
  // retorna el HTML de recuperar contraseña
}