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
    const { id } = req.user;
    const findArticle = await Articles.findOne({
      where: { slug: req.params.slug }
    });
    if (!findArticle) return res.status(404).json({ error: 'article not found', });
    if (findArticle.dataValues.authorId === id) {
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
}
export default CheckUse;
