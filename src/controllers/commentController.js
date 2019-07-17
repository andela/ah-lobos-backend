import dotenv from 'dotenv';
import model from '../db/models/index';


dotenv.config();

const { Comments, Articles } = model;

/**
 * comment controller
 */
class CommentManager {
  /**
   *
   * @param {Object} req
   * @param {Object} res
   * @returns {Object} comment object
   */
  static async createrComment(req, res) {
    try {
      const comment = {
        body: req.body.body,
        slug: req.params.slug,
        user: req.user.id
      };
      const findArticle = await Articles.findOne({ where: { slug: req.params.slug } });
      if (!findArticle) {
        return res.status(404).send({ error: 'The Article requested is not found!' });
      }
      await Comments.create(comment);
      return res.status(201).json({ message: 'Thank you for commenting on our article', data: comment });
    } catch (error) {
      return res.status(409).json({ message: 'Internal Server Error' });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} a Comment was deleted successfully
   */
  static async deleteComment(req, res) {
    try {
      const findArticle = await Articles.findOne({ where: { slug: req.params.slug } });
      if (!findArticle) {
        return res.status(404).send({ error: 'The Article requested is not found!' });
      }
      const findComment = await Comments.destroy({ where: { id: req.params.id } });
      if (!findComment) {
        return res.status(404).send({ error: 'The comment requested is not found!' });
      }
      return res.status(200).json({ message: 'The comment was deleted successfully', });
    } catch (error) {
      return res.status(500).json({ error: 'server error, please try again later', });
    }
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {message} That article is not available
 */
  static async getComments(req, res) {
    const findComments = await Comments.findAll({
      where: { slug: req.params.slug },
      attributes: ['body', 'user'],
      raw: true,
    });
    if (!findComments) {
      return res.status(400).send({ message: 'The Article requested has not been rated yet' });
    }
    const comments = findComments;
    return res.status(200).send({ comments });
  }
}
export default CommentManager;
