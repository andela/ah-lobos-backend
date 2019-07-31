import models from '../../db/models/index';

const { NotificationConfigs } = models;

/**
 * set default configuration for newly created users
 */
class defaultConfig {
  /**
   *
   * @param {Object} settings
   * @returns {Object} creates settings
   */
  static async default(settings) {
    await NotificationConfigs.create(settings);
  }
}
export default defaultConfig;
