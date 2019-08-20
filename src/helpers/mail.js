import sendGridMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import processToken from './processToken';

dotenv.config();
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Send email using send grid API
 */
class mail {
  /**
   *
   * @param {Object} user
   * @returns {Object} email message
   */
  static async sendEmail(user) {
    try {
      const { username, email } = user;
      const token = await processToken.signToken(user);
      const message = {
        to: email,
        from: 'authorshaven@andela.com',
        subject: 'password reset',
        text: `Dear, ${username} please use the provided link to reset your password`,
        html: `<div>Dear ${username},<br>You have requested to reset your password.<br></div>
        <a href="${process.env.FRONT_END_URL}/newpassword/${token}">Please click here to reset your password</a>
        <br><h6>Thank you for using Authors haven.</h6>`,
      };
      const sent = await sendGridMail.send(message);
      return sent;
    } catch (error) {
      return 'invalid email address';
    }
  }
}

export default mail;
