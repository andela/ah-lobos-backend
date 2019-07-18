import model from '../db/models/index';
import following from '../helpers/following';

const { Users, Followers } = model;

/**
 * profile controller
 */
class FollowerManager {
/**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} successfully following a user
   */
  static async followUser(req, res) {
    const user = await Users.findOne({ where: { username: req.params.username } });
    const { id } = req.user;
    if (user.dataValues.id === id) {
      return res.status(400).json({ message: 'you can not follow yourself' });
    }
    const follow = await following.isFollowing(id, user.dataValues.id);
    if (!follow) {
      const data = {
        follower: id,
        followee: user.dataValues.id
      };
      await Followers.create(data);
      const userUp = await Users.findOne({ where: { id: req.user.id } });
      await userUp.update({ following: userUp.dataValues.following + 1 });

      user.dataValues.hash = undefined;
      return res.status(200).json({
        message: 'user followed successfully',
        user: user.dataValues
      });
    }
    return res.status(409).json({ message: 'you are already following this user' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} successfully unfollow a user
   */
  static async unfollowUser(req, res) {
    const user = await Users.findOne({ where: { username: req.params.username } });
    const { id } = req.user;
    const follow = await following.isFollowing(id, user.dataValues.id);
    if (follow) {
      await Followers.destroy({ where: { followee: user.dataValues.id } });
      const userUp = await Users.findOne({ where: { id: req.user.id } });
      await userUp.update({ following: userUp.dataValues.following - 1 });

      user.dataValues.hash = undefined;
      return res.status(200).json({
        message: 'user unfollowed successfully',
        user: user.dataValues
      });
    }
    return res.status(404).json({ message: 'you can not unfollowing a user you are not following' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} user successfully views all users he/she is following
   */
  static async viewFollowees(req, res) {
    const followees = await Followers.findAll({
      where: { follower: req.user.id },
      include: [{
        model: Users,
        attributes: ['id', 'username', 'email', 'bio', 'image', 'favorites', 'following']
      }]
    });
    const num = followees.length;
    if (num !== 0) {
      return res.status(200).json({
        message: 'The users you follow have been fetched successfully',
        noFollowees: followees.length,
        followees
      });
    }
    return res.status(404).json({ message: 'You are not following anyone yet' });
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} user successfully views all users that follow them
   */
  static async viewFollowers(req, res) {
    const x = req.user.id;
    const arr = await Followers.findAll({
      where: { followee: x },
      include: [{
        model: Users,
        attributes: ['id', 'username', 'email', 'bio', 'image', 'favorites', 'following']
      }]
    });
    if (arr.length === 0) {
      return res.status(404).json({
        message: 'You have zero(0) followers'
      });
    }
    return res.status(200).json({
      message: 'Your followers have been fetched successfully',
      noFollowers: arr.length,
      followers: arr
    });
  }
}

export default FollowerManager;
