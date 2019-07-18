import model from '../db/models/index';

const { Followers } = model;
/**
 * generate and verify token
 */
class following {
  /**
   *
   * @param {Number} rId
   * @param {Number} eId
   * @returns {Boolean} Boolean
   */
  static async isFollowing(rId, eId) {
    const found = await Followers.findOne({ where: { follower: rId, followee: eId } });
    if (found) {
      return true;
    }
    return false;
  }
}
export default following;
