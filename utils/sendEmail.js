const nodemailer = require('nodemailer');

const sendResetEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: `"Aula Virtual" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Restablecer contraseña',
    html: `
      <p>Hola,</p>
      <p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${link}">${link}</a>
      <p>Este enlace expira en 60 minutos.</p>
    `
  });
};

module.exports = sendResetEmail;
