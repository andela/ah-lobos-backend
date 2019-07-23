import Sequelize from 'sequelize';
import models from '../db/models/index';

const { Articles, Users } = models;
const { Op } = Sequelize;
/**
 * search query
 */
class searchQuery {
  /**
   *
   * @param {object} query
   * @returns {object} articles
   */
  static async getQuery(query) {
    // this block is destructuring the user's queries
    const {
      title, body, description, author, tag
    } = query;
    const articles = await Articles.findAll({
      where: {
        [Op.or]: [
          title ? { title: { [Op.iLike]: `%${title.trim()}%` } } : '',
          body ? { body: { [Op.iLike]: `%${body.trim()}%` } } : '',
          description ? { description: { [Op.iLike]: `%${description.trim()}%` } } : '',
          tag ? { tagList: { [Op.contains]: [tag.trim()] } } : '',
          author ? { '$author.username$': { [Op.iLike]: `%${author.trim()}%` } } : ''
        ]
      },
      include: [{
        model: Users,
        as: 'author',
        attributes: ['username', 'bio', 'image', 'following']
      }]
    });
    return articles;
  }
}
export default searchQuery;
