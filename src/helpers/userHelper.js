import model from '../db/models';

const { Users } = model;

/**
 * Admin middleware
 */
class AdminHelper {
  /**
     *
     * @param {Object} body
     * @returns {Object} returns user created
     */
  static async createUser(body) {
    const {
      firstName, lastName, username, email, password, bio, role
    } = body;

    const user = {
      firstName, lastName, username, email, hash: password, role, isVerified: false, bio
    };
    const addedUser = await Users.create(user);
    return addedUser;
  }
}

export default AdminHelper;
