import model from '../db/models/index';

const { Permissions } = model;
/**
 * check permissions for a role
 */
class CheckUserPermissions {
  /**
   *
   * @param {string} role
   * @param {string} resource
   * @param {string} action
   * @returns {boolean} true/false
   */
  static async isAllowed(role, resource, action) {
    const userPermissions = await Permissions.findAll({ where: { role, action } });
    if (!userPermissions[0]) return false;
    if ((userPermissions[0].dataValues.resources).includes(resource)) return true;
  }
}

export default CheckUserPermissions;
