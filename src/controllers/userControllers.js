import model from '../db/models/index';

const { Users } = model;

/**
 * user controller
 */
class UserManager {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {Object} user object
   */
  static async registerUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = {
        username, email, hash: password
      };

      await Users.create(user);
      return res.status(201).json({
        message: 'user registered succesfully',
        user: {
          username,
          email,
        }
      });
    } catch (error) {
      return res.status(409).json({
        message: 'user with the same email already exist'
      });
    }
  }
}
export default UserManager;
