import checkPermissions from '../helpers/checkUserPermissions';
/**
 * check permissions for a role
 */
class UserPermissions {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkArticlesPermissions(req, res, next) {
    const { role: userRole } = req.user;
    const permit = await checkPermissions.isAllowed(userRole, 'Articles', req.method);
    if (permit) next();
    else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkUsersPermissions(req, res, next) {
    const { role } = req.user;
    const allow = await checkPermissions.isAllowed(role, 'Users', req.method);
    if (allow) next();
    else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkCommentsPermissions(req, res, next) {
    const allow = await checkPermissions.isAllowed(req.user.role, 'Comments', req.method);
    if (allow) next();
    else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkLikeDislikePermissions(req, res, next) {
    const { method } = req;
    const allow = await checkPermissions.isAllowed(req.user.role, 'likeDislikes', method);
    if (allow) next();
    else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkFollowersPermissions(req, res, next) {
    const { role } = req.user;
    const { method } = req;
    const allow = await checkPermissions.isAllowed(role, 'Followers', method);
    if (allow === true) next();
    else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkPermissions(req, res, next) {
    const allow = await checkPermissions.isAllowed(req.user.role, 'Permissions', req.method);
    if (allow !== false) next();
    else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkRatingsPermissions(req, res, next) {
    const { method: action } = req;
    const allow = await checkPermissions.isAllowed(req.user.role, 'Ratings', action);
    if (allow) next();
    else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkReportingsPermissions(req, res, next) {
  /**
   * This method first of all check if a user role  is admin or not
   */
    const { method: doAction } = req;
    const checkIfAllowed = await checkPermissions.isAllowed(req.user.role, 'Reportings', doAction);
    if (checkIfAllowed) {
      next();
    } else return res.status(403).json({ error: 'access denied' });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {0} -
   */
  static async checkStatisticsPermissions(req, res, next) {
    const { method } = req;
    const checkIfAllowed = await checkPermissions.isAllowed(req.user.role, 'Statistics', method);
    if (checkIfAllowed) {
    /**
     *
     * go next if user is allowed
     *
     */
      next();
    } else return res.status(403).json({ error: 'access denied' });
  }
}

export default UserPermissions;
