import models from '../db/models/index';

const { Articles, Comments } = models;

/**
 * check user's right middle-ware
 */
class CheckUse {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} checked user
   */
  static async isArticleOwner(req, res, next) {
    const { id, role } = req.user;
    const findArticle = await Articles.findOne({
      where: { slug: req.params.slug }
    });
    if (!findArticle) return res.status(404).json({ error: 'article not found', });
    if (findArticle.dataValues.authorId === id || role === 'admin') {
      req.article = findArticle;
      next();
      return 1;
    }
    return res.status(403).json({
      message: 'you are not allowed to perfom this action'
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} checked user to delete
   */
  static async isCommentOwner(req, res, next) {
    try {
      const findComment = await Comments.findOne({ where: { user: req.user.id } });
      if (!findComment) {
        return res.status(403).json({ message: 'you are not allowed to perfom this action' });
      }
      next();
    } catch (error) {
      return res.status(404).json({ error: 'server error', });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next,
   * @returns {Object} return next if is admin
   */
  static async isAdmin(req, res, next) {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(403).json({
        error: 'You are not allowed to access this route.'
      });
    }
    next();
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   * @returns {Object} return next
   */
  static async hasRole(req, res, next) {
    const { role } = req.body;
    if (role) {
      return res.status(409).json({
        message: 'As user you should not specify a role field'
      });
    }
    next();
  }
}
export default CheckUse;
