import model from '../db/models/index';

const { Permissions } = model;

/**
 * permission controller
 */
class Permission {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} permission
   */
  static async createPermission(req, res) {
    try {
      const { role, action, resources } = req.body;
      const addPermission = await Permissions.create({ role, action, resources });
      if (addPermission) {
        return res.status(201).json(addPermission);
      }
    } catch (error) {
      return res.status(409).json({
        error: 'permission already exist'
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated permission
   */
  static async changePermissions(req, res) {
    const { permissionNo } = req.params;
    const { resources } = req.body;
    const fetchPermission = await Permissions.findOne({ where: { permissionNo } });
    if (!fetchPermission) return res.status(404).json({ error: 'permission not found' });
    const updatePermission = await fetchPermission.update({ resources });
    if (updatePermission) {
      const { role, resources: on, action: access } = updatePermission.dataValues;
      return res.status(200).json({ role, access, on });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} list of all permissions
   */
  static async viewAllPermissions(req, res) {
    const fetchPermissions = await Permissions.findAll();
    if (!fetchPermissions[0]) return res.status(404).json({ error: 'oops! no permission found' });
    return res.status(200).json(fetchPermissions);
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} list of all permissions
   */
  static async allPermissionsByRole(req, res) {
    const { role } = req.params;
    const rolePermissions = await Permissions.findAll({ where: { role } });
    if (!rolePermissions[0]) return res.status(404).json({ error: 'oops! no permissions found for that role' });
    return res.status(200).json(rolePermissions);
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} list of all permissions
   */
  static async allPermissionsByAction(req, res) {
    const action = (req.params.action).toUpperCase();
    const actionPermissions = await Permissions.findAll({ where: { action } });
    if (!actionPermissions[0]) return res.status(404).json({ error: 'oops! no permissions found for that action' });
    return res.status(200).json(actionPermissions);
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {string} a message on delete action
   */
  static async deleteRolePermissions(req, res) {
    const { permissionNo } = req.params;
    const removeRoleAndPermissions = await Permissions.destroy({ where: { permissionNo } });
    if (!removeRoleAndPermissions) return res.status(404).json({ error: 'oops! role and permissions not found' });
    return res.status(200).json({ message: 'role and permissions successfully deleted' });
  }
}
export default Permission;
