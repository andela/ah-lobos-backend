import dotenv from 'dotenv';
import model from '../db/models';
import processToken from '../helpers/processToken';

const { Users } = model;

dotenv.config();

/**
 * User Information are saved here
 */
class UserInfo {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} response after user signin
   */
  static async googleLogin(req, res) {
    const { displayName } = req.user;
    const newUser = await Users.create({
      username: displayName,
      email: req.user.emails[0].value,
      image: req.user.photos[0].value,
      isVerified: req.user.emails[0].verified,
      socialId: req.user.id,
      provider: 'google',
      hash: process.env.DEFAULT_PASSWORD
    });
    if (newUser) {
      const {
        dataValues: {
          id, username, email
        }
      } = newUser;
      const token = await processToken.signToken(newUser.dataValues);
      return res.status(200).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token, id, username, email
        },
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} user successfully logged in
   */
  static async facebookLogin(req, res) {
    const { displayName } = req.user;
    const newUser = await Users.create({
      username: displayName,
      email: req.user.emails[0].value,
      image: req.user.photos[0].value,
      isVerified: true,
      socialId: req.user.id,
      provider: 'facebook',
      hash: process.env.DEFAULT_PASSWORD
    });
    if (newUser) {
      const {
        dataValues: {
          id, username, email
        }
      } = newUser;
      const token = await processToken.signToken(newUser.dataValues);
      return res.status(200).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token, id, username, email
        },
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @return {Object} user logged in
   */
  static async twitterLogin(req, res) {
    const {
      displayName
    } = req.user;

    // eslint-disable-next-line no-unused-expressions
    const newUser = await Users.create({
      username: req.user.username,
      email: `${req.user.username}@gmail.com`,
      image: req.user.photos[0].value,
      isVerified: true,
      socialId: req.user.id,
      provider: 'twitter',
      hash: process.env.DEFAULT_PASSWORD
    });
    if (newUser) {
      const {
        dataValues: {
          id, username
        }
      } = newUser;
      const token = await processToken.signToken(newUser.dataValues);
      return res.status(200).json({
        message: `Welcome to Authors Haven ${displayName} `,
        data: {
          token, id, username
        },
      });
    }
  }
}

export default UserInfo;
