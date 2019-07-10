import models from '../db/models/index';

const { Articles } = models;

/**
 * check user's right middle-ware
 */
class checkUse {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} checked user
   */
  static async isArticleOwner(req, res, next) {
    try {
      const findArticle = await Articles.findOne({
        where: { slug: req.params.slug }
      });
      if (findArticle.dataValues.postedBy !== req.user.id) {
        return res.status(403).json({
          message: 'you are not allowed to perfom this action'
        });
      }
      req.article = findArticle;
      next();
    } catch (error) {
      return res.status(404).json({
        error: 'article not found',
      });
    }
  }
}
export default checkUse;
