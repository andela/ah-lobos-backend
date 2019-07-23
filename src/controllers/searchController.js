import search from '../helpers/search';

/**
 * search controller
 */
class SearchManager {
/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} user search for articles
 */
  static async search(req, res) {
    const articles = await search.getQuery(req.query);
    if (articles.length === 0) {
      return res.status(404).json({ message: 'There are no search results for your query' });
    }
    return res.status(200).json({ articles });
  }
}

export default SearchManager;
