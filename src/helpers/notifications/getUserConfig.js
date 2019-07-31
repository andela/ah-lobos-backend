import models from '../../db/models/index';

const { NotificationConfigs } = models;

/**
 * get user notification configurations
 */
class userConfig {
/**
 *
 * @param {Object} userId
 * @returns {Object} check user settings
 */
  static async get(userId) {
    const config = await NotificationConfigs.findOne({ where: { userId } });
    const preference = JSON.parse(config.dataValues.config);
    return preference;
  }
}

export default userConfig;
