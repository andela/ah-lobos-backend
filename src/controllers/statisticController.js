import model from '../db/models/index';

const { Articles, Statistics } = model;
/**
 * statistic controller
 */
class StatisticManager {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} stats
   */
  static async createStats(req, res) {
    const { id } = req.user;
    const { slug } = req.params;
    const findArticle = await Articles.findOne({ where: { slug } });
    if (!findArticle) return res.status(200).json({ error: 'No article found' });
    const [result, created] = await Statistics.findOrCreate({
      where: { userId: id, articleId: findArticle.id }, defaults: { numberOfReading: 1 }
    });
    if (!created) {
      await Statistics.update(
        { numberOfReading: result.numberOfReading + 1 },
        { where: { id: result.id }, returning: true }
      );
    }
    return res.status(201).json({
      message: 'I am reading an article...',
      On: result.updatedAt,
      article: findArticle.title
    });
  }

  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} retrieve all user stats
   */
  static async retrieveUserReadingStats(req, res) {
    const { id } = req.user;
    const countTotalArticlesRead = await Statistics.count({ where: { userId: id } });
    const articlesRead = await Statistics.findAll({
      where: { userId: id },
      attributes: [
        ['numberOfReading', 'TimesArticleRead'],
        ['updatedAt', 'lastSeen']],
      include: [
        {
          model: Articles,
          attributes: ['title', 'slug', 'body'],
        }
      ]
    });
    if (countTotalArticlesRead) {
      return res.status(200).json({ allArticlesRead: countTotalArticlesRead, articlesRead });
    }
    return res.status(200).json({ allArticlesRead: 0, articlesRead });
  }
}
export default StatisticManager;
