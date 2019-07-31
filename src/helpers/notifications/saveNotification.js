import sendGridMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import models from '../../db/models/index';

dotenv.config();
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const { Notifications } = models;

/**
 * Save notifications
 */
class save {
  /**
   *
   * @param {Object} data
   * @returns {Object} send and save notifications
   */
  static async send(data) {
    const {
      config, user, action, inAppMessage, emailMessage, url
    } = data;
    const inAppNotification = { userId: user.dataValues.id, message: inAppMessage, url };
    const emailNotification = {
      userId: user.dataValues.id, message: emailMessage, preference: 'email', url
    };
    const { inApp, email } = config;
    if (inApp.articles.show && inApp.articles.on.includes(action)) {
      await Notifications.create(inAppNotification);
    }
    if (email.articles.show && email.articles.on.includes(action)) {
      const message = {
        to: user.dataValues.email,
        from: 'noreply@authorshaven.com',
        subject: 'Notifications',
        text: emailMessage,
        html: `<p>${emailMessage}</p><br><a href="${url}">Please click here for details</a>
        <br><h6>Thank you for using Authors haven.</h6>`,
      };
      await sendGridMail.send(message);
      await Notifications.create(emailNotification);
    }
  }
}
export default save;
