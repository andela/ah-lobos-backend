import bcrypt from 'bcrypt';
import model from '../db/models/index';
import mail from '../helpers/mail';
import validations from '../helpers/validations';
import processToken from '../helpers/processToken';

const { Users } = model;

/**
 * user controller
 */
class UserManager {
  /**
   *
   * @param {Object} req
   * @param {Object} res
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
      const token = await processToken.signToken(payload);

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
          const token = await processToken.signToken(payload);
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

  /**
   * @param {Object} req
   * @param {Object} res
   * @returns {String} acknowledgement message
   */
  static async forgotPassword(req, res) {
    const checkUserInput = validations.checkForgotPasswordData(req.body);
    if (!checkUserInput.email) {
      return res.status(400).json({
        error: checkUserInput,
      });
    }
    const findUser = await Users.findOne({ where: { email: req.body.email } });
    if (findUser !== null) {
      const { username, email } = findUser.dataValues;
      const user = {
        username,
        email
      };
      const resetEmail = await mail.sendEmail(user);
      if (resetEmail[0].statusCode === 202) {
        return res.status(200).json({
          message: 'please check your email for password reset',
        });
      }
      return res.status(400).json({
        error: resetEmail,
      });
    }
    return res.status(404).json({
      error: `email: ${req.body.email} not found, please check your email and try again`,
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} success user password reset message
   */
  static async resetPassword(req, res) {
    try {
      const checkUserData = validations.checkResetPasswordData(req.body);
      if (checkUserData.password) {
        const verifyToken = await processToken.verifyToken(req.params.userToken);
        const { password } = checkUserData;
        const hashedPassword = bcrypt.hashSync(password, 10);
        const findUser = await Users.findOne({ where: { email: verifyToken.email } });
        const comparePassword = bcrypt.compareSync(password, findUser.dataValues.hash);
        if (comparePassword !== true) {
          const updatePassword = await Users.update(
            { hash: hashedPassword },
            { where: { email: verifyToken.email } }
          );

          if (updatePassword[0] === 1) {
            return res.status(200).json({
              message: 'password changed successful',
            });
          }
        }
        return res.status(406).json({
          error: 'the provided password is the same as the one you had, please change it or continue using the one you have',
        });
      }
      return res.status(400).json({
        errors: checkUserData,
      });
    } catch (error) {
      return res.status(404).json({
        error: 'password reset failed, please try again'
      });
    }
  }
}
export default UserManager;
