import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import model from '../db/models/index';
import mail from '../helpers/mail';
import validations from '../helpers/validations';
import processToken from '../helpers/processToken';

import sendVerificationEmail from '../helpers/sendVerificationEmail';

dotenv.config();

const { Users, BlacklistTokens } = model;

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
        username, email, hash: password, isVerified: false, bio, image
      };
      const addedUser = await Users.create(user);
      const { id, role } = addedUser.dataValues;
      const payload = {
        id, username, email, role
      };
      const token = await processToken.signToken(payload);
      const sendVerification = await sendVerificationEmail.send(token, email);
      if (sendVerification) {
        return res.status(201).json({
          message: 'Thank you for registration, You should check your email for verification',
          user: {
            email: addedUser.email,
            token,
            username: addedUser.username,
            bio: addedUser.bio,
            image: addedUser.image
          }
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(409).json({
        message: 'user with the same email already exist'
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} verification message
   */
  static async verification(req, res) {
    try {
      const findUser = await Users.findOne({
        where: { email: req.query.email }
      });

      if (findUser) {
        if (findUser.isVerified) {
          return res.status(202).json({
            message: 'Email already Verified.'
          });
        }
        await Users.update({ isVerified: true }, { where: { id: findUser.id } });
        return res.status(403).json({
          message: `User with ${findUser.email} has been verified, use this link to login: https://ah-lobos-backend-swagger.herokuapp.com`,
        });
      }
    } catch (error) {
      return res.status(500).json({
        message: 'internal server error! please try again later'
      });
    }
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {Object} user object
   */
  static async login(req, res) {
    try {
      const findUser = await Users.findOne({ where: { email: req.body.email } });

      if (findUser) {
        const {
          id, username, email, hash, isVerified, role
        } = findUser.dataValues;
        const userData = {
          id, username, email, hash, isVerified, role
        };
        if (!findUser.dataValues.isVerified) {
          return res.status(401).json({
            message: 'Please check your email and click the button for email verification'
          });
        }

        if (bcrypt.compareSync(req.body.password, userData.hash)) {
          const payload = {
            id,
            username,
            email,
            role
          };
          const token = await processToken.signToken(payload);
          return res.status(200).json({
            message: 'User has been successfully logged in',
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
    return res.status(404).json({ error: `email: ${req.body.email} not found, please check your email and try again`, });
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

  /**
 *
 * @param {obkect} req
 * @param {object} res
 * @returns {message} User logged out
 */
  static async logout(req, res) {
    const { token } = req.headers;
    const tokenPayload = await processToken.verifyToken(token);
    const { exp } = tokenPayload;
    await BlacklistTokens.create({ token, expires: exp * 1000 });
    return res.status(200).json({
      message: 'User logged out'
    });
  }
}
export default UserManager;
