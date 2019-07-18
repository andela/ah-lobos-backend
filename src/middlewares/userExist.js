import model from '../db/models/index';

const { Users } = model;
/**
 * user exist middle-ware
 */
class exist {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns{object} user object
   */
  static async isUser(req, res, next) {
    const detail = req.params.username;
    const resource = await Users.findOne({ where: { username: detail } });

    if (!resource) {
      return res.status(404).json({ message: 'user does not exist' });
    }
    next();
  }
}
export default exist;
