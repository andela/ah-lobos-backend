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
    const notifications = await Notifications.findAll({ where: { userId: req.user.id, status: 'unseen' } });
    if (notifications.length === 0) {
      return res.status(404).json({ message: 'You are all caught up, you have zero notifications' });
    }
    notifications.map(async (notification) => {
      await notification.update({
        status: 'seen'
      });
    });
    return res.status(200).json({ number: notifications.length, notifications });
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
