import processToken from '../helpers/processToken';

/**
 * authentication middle-ware
 */
class authentication {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns{object} user object
   */
  static async checkAuthentication(req, res, next) {
    try {
      const { token } = req.headers;
      const userInfo = await processToken.verifyToken(token);
      req.user = userInfo;
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'please login or signup',
      });
    }
  }
}
export default authentication;
