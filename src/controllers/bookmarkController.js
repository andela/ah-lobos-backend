import model from '../db/models';

const { Bookmark, Articles } = model;
/**
 * Bookmark class
 */
class BookmarkManager {
  /**
     *
     * @param {Object} req
     * @param {Object} res
     * @return {Object} bookmarked story
     */
  static async create(req, res) {
    try {
      const { id } = req.user;
      const { slug } = req.params;

      const findArticle = await Articles.findOne({ where: { slug } });
      const checkBookmark = await Bookmark.findOne({ where: { userId: id, slug } });
      if (!checkBookmark) {
        const createBookmark = await Bookmark.create({
          userId: id,
          slug,
          title: findArticle.dataValues.title,
          description: findArticle.dataValues.description
        });
        return res.status(201).json({
          message: 'You have bookmarked successfully',
          data: createBookmark
        });
      }
      return res.status(409).json({
        message: 'You have already bookmarked this article'
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Something went wrong, with the server.'
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} Bookmarked stories
   */
  static async getAllArticlesBookmarked(req, res) {
    try {
      const { id } = req.user;
      const bookmarks = await Bookmark.findAll({ where: { userId: id } });
      if (bookmarks.length) {
        return res.status(200).json({
          message: 'You successfully fetched  bookmarked articles',
          data: bookmarks
        });
      }
      return res.status(404).json({
        message: 'You have not yet bookmarked any story'
      });
    } catch (error) {
      return res.status(500).json({
        message: 'Something went wrong, with the server.'
      });
    }
  }

  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} destroy bookmark
   */
  static async remove(req, res) {
    try {
      const { id } = req.user;
      const { slug } = req.params;

      const exist = await Bookmark.findOne({ where: { userId: id, slug } });

      if (exist) {
        await Bookmark.destroy({
          where: {
            userId: id,
            slug
          }
        });
        return res.json({
          message: 'Bookmark removed successfully'
        });
      }
      return res.json({ error: 'Bookmark was not found' });
    } catch (error) {
      return res.status(500).json({
        error
      });
    }
  }
}

export default BookmarkManager;
