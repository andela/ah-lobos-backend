import dotenv from 'dotenv';
import moment from 'moment';
import model from '../db/models/index';


dotenv.config();

const { Comments, Articles, CommentEditHistory } = model;

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
      attributes: ['body', 'user', 'slug'],
      raw: true,
    });
    if (!findComments.length) {
      return res.status(400).send({ message: 'There is no comments on this article' });
    }
    const comments = findComments;
    return res.status(200).send({ comments });
  }


  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} updated article
 */
  static async editComment(req, res) {
    try {
      const newComment = {
        body: req.body.body
      };
      const findComment = await Comments.findOne({ where: { id: req.params.id } });
      if (!findComment) {
        return res.status(404).send({ error: 'The comment requested is not found!' });
      }
      const { body, id } = findComment.dataValues;
      await CommentEditHistory.create({ body, bodyId: id, newBody: req.body.body });
      await findComment.update({ body: req.body.body });
      return res.status(200).json({
        newComment
      });
    } catch (err) {
      return res.status(500).json({
        err: 'internal server error'
      });
    }
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} updated article
 */
  static async getEditComment(req, res) {
    try {
      let findComment = await CommentEditHistory.findAll({
        where: { bodyId: req.params.id },
        attributes: ['createdAt', 'newBody'],
        raw: true,
      });
      if (!findComment.length) {
        return res.status(404).send({ error: 'The comment requested has no been edited' });
      }
      const findParent = await CommentEditHistory.findAll({ where: { bodyId: req.params.id } });
      findComment = findComment.map((comment) => {
        comment.createdAt = moment(comment.createdAt).format('DD-MM-YYYY HH:mm');
        return comment;
      });
      const parent = findParent[0].body;
      const update = findComment[findComment.length - 1].newBody;
      const reverse = findComment.reverse();
      return res.status(200).json({ updatedComment: update, history: reverse, Orginal: parent });
    } catch (err) {
      return res.status(500).json({ err: 'internal server error' });
    }
  }
}
export default CommentManager;
