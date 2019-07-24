import model from '../db/models';

const { Users } = model;
/**
 * Admin class functionality
 */
class AdminManager {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} returns all users
   */
  static async getAll(req, res) {
    try {
      const allUsers = await Users.findAll();
      if (allUsers) {
        return res.status(200).json({
          users: allUsers
        });
      }
      return res.status(404).json({
        message: 'Users was not found'
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }


  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} return user deleted
   */
  static async delete(req, res) {
    const { id } = req.params;
    try {
      const deleteUser = await Users.destroy({
        where: { id }
      });
      if (deleteUser) {
        return res.status(200).json({
          message: 'user deleted successfully'
        });
      }
      return res.status(409).json({
        error: 'The user was not deleted please, try again'
      });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }
}

export default AdminManager;
