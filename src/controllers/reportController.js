import model from '../db/models/index';

const { Users, Articles, Reporting } = model;
/**
 * report controller
 */
class ReportManager {
  /**
   * @param {object} req
   * @param {object} res
   * @returns {object} report
   */
  static async postReport(req, res) {
    const { slug } = req.params;
    const { message } = req.body;
    const { id: reporter } = req.user;
    const findArticle = await Articles.findOne({
      where: { slug },
      attributes: ['id', 'slug', 'title', 'body']
    });
    if (!findArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    const findReported = await Reporting.findOne({
      where: { reporter, articleId: findArticle.id }
    });
    if (findReported) {
      return res.status(400).json({ error: 'You have already reported this article!' });
    }
    await Reporting.create({ reporter, message, articleId: findArticle.id });
    return res.status(201).json({
      message: 'Article reported successfully ',
      reason: message,
      article: findArticle
    });
  }

  /**
   * Only admin should be able to view all reported article
   * @param {object} req
   * @param {object} res
   * @returns {object} The reported article
   */
  static async getAllReportedArticles(req, res) {
    const { role } = req.user;
    if (role !== 'admin') {
      return res.status(401).send({ error: 'Unauthorized to this request' });
    }
    const getAllReports = await Reporting.findAll({
      attributes: { exclude: ['id', 'articleId', 'reporter'] },
      include: [
        {
          model: Users,
          attributes: ['username', 'email', 'bio']
        },
        {
          model: Articles,
          attributes: ['title', 'slug', 'description', 'image']
        }
      ]
    });
    return res.status(200).send({
      data: getAllReports
    });
  }
}
export default ReportManager;
