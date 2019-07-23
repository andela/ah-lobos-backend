import processToken from '../helpers/processToken';

/**
 * authenticate user
 */
class isAuth {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} user details
   */
  static async isOwner(req, res, next) {
    const { token } = req.headers;
    const { username } = await processToken.verifyToken(token);
    if (username !== req.params.username) {
      return res.status(403).json({
        message: 'Forbidden access'
      });
    }
    next();
  }
}

export default isAuth;
