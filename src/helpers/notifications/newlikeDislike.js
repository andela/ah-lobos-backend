import dotenv from 'dotenv';
import models from '../../db/models/index';
import userConfig from './getUserConfig';
import save from './saveNotification';

dotenv.config();
const { Users, Articles } = models;

/**
 * get all reactions
 */
class reactions {
  /**
   *
   * @param {Object} reaction
   * @returns {Object} get reaction
   */
  static async getReaction(reaction) {
    const user = await Users.findOne({ where: { id: reaction.userId } });
    const article = await Articles.findOne({ where: { slug: reaction.slug }, include: [{ model: Users, as: 'author' }] });
    const { APP_URL } = process.env;
    let url = `${APP_URL}/api/comments/articles/${reaction.slug}`;
    let reactionType = 'reacted';
    if (reaction.like) {
      reactionType = 'liked';
      url = `${APP_URL}/api/articles/like/${reaction.slug}`;
    }
    if (reaction.dislike) {
      reactionType = 'disliked';
      url = `${APP_URL}/api/articles/dislike/${reaction.slug}`;
    }
    const author = article.dataValues.author.dataValues;

    const config = await userConfig.get(author.id);
    const action = 'like';
    const inAppMessage = `Hello ${author.username}, ${user.dataValues.username} just ${reactionType} your article titled ${article.dataValues.title}`;
    const data = {
      user: article.dataValues.author, config, action, inAppMessage, url
    };
    save.send(data);
  }
}
export default reactions;
