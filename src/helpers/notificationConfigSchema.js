import Joi from '@hapi/joi';

/**
 *  notificationConfig validaton
 */
class ValidateConfig {
/**
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {Object} notificationConfigSchema object
 */
  static async notificationConfigSchema(req, res, next) {
    const configSchema = Joi.object().keys({
      inApp: Joi.boolean().required(),
      email: Joi.boolean().required()
    });
    const { inApp, email } = req.body;
    const result = Joi.validate({ inApp, email }, configSchema, { abortEarly: false });
    if (result.error) {
      const logs = [];
      const num = result.error.details.length;
      const arr = result.error.details;
      for (let i = 0; i < num; i += 1) {
        logs.push(arr[i].message.replace('"', ' ').replace('"', ' '));
      }
      return res.status(400).json({ Errors: logs });
    }
    next();
  }
}

export default ValidateConfig;
