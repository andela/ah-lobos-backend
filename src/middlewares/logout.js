
import models from '../db/models';

const { BlacklistTokens } = models;
/**
 * logout
 */
class logout {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {message} user already logged out
   */
  static async logoutToken(req, res, next) {
    const head = req.headers.token;
    const findToken = await BlacklistTokens.findOne({
      where: { token: head }
    });
    if (findToken) {
      return res.status(400).json({ message: 'user already logged out' });
    }
    next();
  }
}

export default logout;
