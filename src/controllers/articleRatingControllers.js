import model from '../db/models/index';

const { Users, Articles, Rating } = model;

/**
 * rating controller
 */
class ArticleRatingManager {
  /**
     *
     * @param {Object} req
     * @param {Object} res
     * @returns {Object} return object
     */
  static async rateArticle(req, res) {
    const { slug } = req.params;
    const { rating } = req.body;
    const { email } = req.user;

    try {
      const findArticle = await Articles.findOne({ where: { slug } });
      if (!findArticle) {
        return res.status(404).send({
          error: 'Article not found!'
        });
      }
      const findUser = await Users.findOne({ where: { email } });

      if (findUser.id === findArticle.postedBy) {
        return res.status(400).json({
          error: 'You can not rate your article!'
        });
      }

      const findIfUserRatedArticle = await Rating.findOne({
        where: {
          user: findUser.id,
          articleId: findArticle.id
        }
      });
      if (findIfUserRatedArticle) {
        return res.status(400).json({
          error: 'You have already rated this article'
        });
      }

      const saveRating = await Rating.create({
        rating,
        user: findUser.id,
        articleId: findArticle.id
      });
      const { user, rating: ratingData } = saveRating;
      return res.status(201).json({
        message: 'Article rated successfuly',
        data: {
          user,
          rating: ratingData,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Internal Server Error'
      });
    }
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {message} That article is not available
 */
  static async ratingAverage(req, res) {
    const averageRating = await Rating.findAll({
      where: { articleId: req.params.articleId },
      attributes: ['rating'],
      raw: true,
    });
    if (!averageRating.length) {
      return res.status(400).send({
        message: 'The Article requested has not been rated yet'
      });
    }
    let totalrating = 0;
    averageRating.map((rating) => {
      totalrating += rating.rating;
      return averageRating;
    });
    const average = (totalrating / averageRating.length).toFixed(1);
    return res.status(200).send({
      rating: {
        average,
        raters: averageRating.length
      }
    });
  }
}
export default ArticleRatingManager;
