import dotenv from 'dotenv';
import models from '../../db/models/index';
import userConfig from './getUserConfig';
import save from './saveNotification';

dotenv.config();
const { Users, Articles } = models;

/**
 * get all comments
 */
class commentNotification {
  /**
   *
   * @param {Object} user
   * @param {Object} slug
   * @returns {Object} get comments
   */
  static async getComment(user, slug) {
    const userInfo = await Users.findOne({ where: { id: user } });
    const article = await Articles.findOne({ where: { slug }, include: [{ model: Users, as: 'author' }] });

    const author = article.dataValues.author.dataValues;

    const { APP_URL } = process.env;
    const url = `${APP_URL}/api/comments/articles/${slug}`;
    const config = await userConfig.get(author.id);
    const action = 'comment';
    const inAppMessage = `Hello ${author.username}, ${userInfo.dataValues.username} just commented on your article titled ${article.dataValues.title}`;

    save.send({
      user: article.dataValues.author, config, action, inAppMessage, url
    });
  }
}
export default commentNotification;
