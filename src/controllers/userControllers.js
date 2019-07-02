import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
      const {
        username, email, password, bio, image
      } = req.body;
      const user = {
        username, email, hash: password, bio, image: null
      };

      const payload = { username, email };
      const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });

      await Users.create(user);
      return res.status(201).json({
        message: 'user registered succesfully',
        user: {
          email,
          token,
          username,
          bio,
          image
        }
      });
    } catch (error) {
      return res.status(409).json({
        message: 'user with the same email already exist'
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {Object} user object
   */
  static async login(req, res) {
    try {
      const findUser = await Users.findOne({
        where: { email: req.body.email }
      });

      if (findUser) {
        const { username, email, hash } = findUser.dataValues;
        const userData = { username, email, hash };

        if (bcrypt.compareSync(req.body.password, userData.hash)) {
          const payload = {
            username: userData.username,
            email: userData.email
          };
          const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
          return res.status(200).json({
            message: 'login succesfull',
            user: {
              token,
              email: payload.email,
              username: payload.username
            }
          });
        }
        return res.status(401).json({
          message: 'incorrect password'
        });
      }
      return res.status(404).json({
        message: `user with email: ${req.body.email} does not exist`
      });
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error! please try again later'
      });
    }
  }
}
export default UserManager;
