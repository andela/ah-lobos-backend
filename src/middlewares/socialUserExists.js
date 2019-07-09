import model from '../db/models';
import processToken from '../helpers/processToken';

// eslint-disable-next-line no-unused-vars
const { Users } = model;

/**
 * Social User Exists
 */
class UserExists {
  /**
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Object} next
     * @returns {Object} next if all passed
     */
  static async google(req, res, next) {
    const { emails, displayName } = req.user;
    const currentUser = await Users.findAll({
      where: { email: emails[0].value }
    });

    if (currentUser.length > 0) {
      const token = await processToken.signToken(currentUser[0].dataValues);
      const {
        id, username, email
      } = currentUser[0].dataValues;
      return res.status(200).json({
        message: `Welcome to Authors Haven ${displayName}`,
        data: {
          token,
          id,
          username,
          email
        },
      });
    }
    next();
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @return {Object} return next
   */
  static async twitter(req, res, next) {
    const { displayName } = req.user;
    const currentUser = await Users.findAll({
      where: {
        socialId: req.user.id,
      },
    });
    if (currentUser.length > 0) {
      const token = await processToken.signToken(currentUser[0].dataValues);
      const {
        id, username
      } = currentUser[0].dataValues;
      return res.status(200).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token,
          id,
          username
        },
      });
    }
    next();
  }
}

export default UserExists;
