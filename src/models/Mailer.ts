import nodemailer from 'nodemailer';
import { infoMailer } from '../types/types';

class Mailer {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.ionos.es',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.USER_IONOS, // generated ethereal user
        pass: process.env.PASSWORD_IONOS, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendToken(data: infoMailer) {
    const { email, confirmURL } = data;

    await this.transporter.sendMail({
      from: 'info@manelproyectweb.es', // sender address
      to: email, // list of receivers
      subject: 'Confirmación de Cuenta', // Subject line
      html: `<b>Bienvenido al Blog te adjuntamos el enlace 
                de confirmación de tu cuenta:</b><br/>

                
                ${confirmURL}`,
    });
  }
}
export default Mailer;
