import model from '../db/models/index';

const { Notifications, NotificationConfigs } = model;

/**
 * notification controller
 */
class NotificationManager {
/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} article
 */
  static async getNotifications(req, res) {
    const notifications = await Notifications.findAll({ where: { userId: req.user.id, preference: 'inApp' } });
    if (notifications.length === 0) {
      return res.status(404).json({ message: 'You are all caught up, you have zero notifications' });
    }
    return res.status(200).json({ number: notifications.length, notifications });
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} article
 */
  static async readNotification(req, res) {
    const notifications = await Notifications.findOne({ where: { id: req.params.id } });
    if (notifications.length === 0) {
      return res.status(404).json({ message: 'You are all caught up, you have zero notifications' });
    }
    await notifications.update({
      status: req.body.status
    });
    return res.status(200).json({ number: notifications.length, notifications });
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} article
 */
  static async getNotificationsConfig(req, res) {
    const config = await NotificationConfigs.findOne({ where: { userId: req.user.id } });
    const settings = JSON.parse(config.config);
    return res.status(200).json({ settings });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} article
   */
  static async updateConfig(req, res) {
    const config = await NotificationConfigs.findOne({ where: { userId: req.user.id } });
    const { inApp, email } = req.body;
    const userConfig = {
      inApp: {
        articles: {
          show: inApp,
          on: ['publish', 'comment', 'like']
        }
      },
      email: {
        articles: {
          show: email,
          on: ['publish']
        }
      }
    };
    await config.update({
      config: JSON.stringify(userConfig),
    });
    return res.status(200).json({ config });
  }
}
export default NotificationManager;
