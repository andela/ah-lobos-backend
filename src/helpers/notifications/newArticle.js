import dotenv from 'dotenv';
import models from '../../db/models/index';
import userConfig from './getUserConfig';
import save from './saveNotification';

dotenv.config();
const { Followers, Users } = models;

/**
 * get all followers of this user
 */
class articleNotification {
/**
 *
 * @param {Object} authorId
 * @param {Object} slug
 * @returns {Object} creates settings
 */
  static async getFollowers(authorId, slug) {
    const author = await Users.findOne({ where: { id: authorId } });
    let followers = await Followers.findAll({ where: { followee: authorId } });
    followers = followers.length ? followers.map(follower => follower.dataValues.follower) : [];

    const { APP_URL } = process.env;
    return followers.map(async (follower) => {
      const url = `${APP_URL}/articles/${slug}`;

      const user = await Users.findOne({ where: { id: follower } });
      const config = await userConfig.get(user.dataValues.id);

      const inAppMessage = `Hello ${user.dataValues.username}, ${author.dataValues.username} has just published a new article.`;
      const emailMessage = `Hello ${user.dataValues.username}, ${author.dataValues.username} has just published a new article.`;

      const action = 'publish';

      const data = {
        user, config, action, inAppMessage, emailMessage, url
      };
      save.send(data);
    });
  }
}
export default articleNotification;
