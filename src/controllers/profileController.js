import model from '../db/models/index';
import { dataUri } from '../middlewares/multer';
import { uploader } from '../db/config/cloudinaryConfig';


const { Users } = model;

/**
 * profile controller
 */
class ProfileManager {
/**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} success user view profile
   */
  static async viewProfile(req, res) {
    const user = await Users.findOne({ where: { username: req.params.username } });
    if (user) {
      user.hash = undefined;
      return res.status(200).json({
        profile: user
      });
    }
    return res.status(404).json({
      message: 'user with that email does not exist'
    });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} success user update profile
   */
  static async updateProfile(req, res) {
    try {
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        req.body.image = result.url;
      }

      const user = await Users.findOne({ where: { username: req.params.username } });
      const updated = await user.update({
        firstName: req.body.firstName || user.firstName,
        lastName: req.body.lastName || user.lastName,
        email: req.body.email || user.email,
        username: req.body.username || user.username,
        image: req.body.image || user.image,
        bio: req.body.bio || user.bio,
        isVerified: req.body.isVerified || user.isVerified,
        role: req.body.role || user.role
      });
      updated.hash = undefined;
      return res.status(200).json({
        user: updated
      });
    } catch (error) {
      return res.json({ error });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} all users are returned
   */
  static async getAllUsersProfile(req, res) {
    try {
      const findUsers = await Users.findAll({ where: { isVerified: true }, attributes: ['username', 'bio', 'image', 'following'] });
      res.status(200).json({ users: findUsers });
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
}

export default ProfileManager;
