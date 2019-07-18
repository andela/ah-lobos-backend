/* eslint-disable object-curly-newline */
import model from '../db/models/index';
import { dataUri } from '../middlewares/multer';
import { uploader } from '../db/config/cloudinaryConfig';
import readTime from '../helpers/readTime';

const { Users, Articles } = model;
/**
 * artticle controller
 */
class articleManager {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} article
   */
  static async postArticle(req, res) {
    try {
      const { id } = req.user;
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        req.body.image = result.url;
      }
      const { title, body, description, image, tagList } = req.body;
      let generateSlug = `${title} ${id} ${Math.floor(Math.random() * 10000)}`;
      while (generateSlug.match(/ /g)) generateSlug = generateSlug.replace(' ', '-');
      const newArticle = {
        title,
        body,
        description,
        image,
        authorId: id,
        tagList,
        slug: generateSlug.toLowerCase(),
        readtime: readTime.read(body),
      };
      const postNewArticle = await Articles.create(newArticle);
      if (!postNewArticle.error) {
        return res.status(201).json({
          message: 'article created successful',
          article: postNewArticle.dataValues
        });
      }
    } catch (error) {
      return res.status(400).json({
        error: 'please check that you have title, description and body',
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} acknowledgement message for delete action result
   */
  static async removeArticle(req, res) {
    try {
      const deleteArticle = await Articles.destroy({
        where: { slug: req.params.slug }
      });
      if (deleteArticle) {
        return res.status(200).json({
          message: 'article deleted successfully',
        });
      }
    } catch (error) {
      return res.status(500).json({
        error: 'server error, please try again later',
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} a single article
   */
  static async readArticle(req, res) {
    try {
      const { slug } = req.params;
      const findArticle = await Articles.findOne({
        where: { slug },
        include: [{
          as: 'author',
          model: Users,
          attributes: ['username', 'bio', 'image']
        }],
        attributes: ['slug', 'title', 'description', 'readtime', 'body', 'tagList', 'favorited', 'favoritesCount', 'updatedAt', 'createdAt']
      });

      return res.status(200).json({
        article: findArticle
      });
    } catch (error) {
      return res.status(404).json({
        error: 'article not found',
      });
    }
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns{object} updated article
 */
  static async updateArticle(req, res) {
    try {
      if (req.file) {
        const file = dataUri(req).content;
        const result = await uploader.upload(file);
        req.body.image = result.url;
      }
      const { title, description, body, image, } = req.body;

      const oldArticle = req.article;
      const updateArticle = await oldArticle.update({
        title: title || req.article.title,
        description: description || req.article.description,
        body: body || req.article.body,
        image: image || req.article.image
      });
      if (updateArticle) {
        return res.status(200).json({
          article: updateArticle
        });
      }
    } catch (err) {
      return res.status(200).json({
        err
      });
    }
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns{object} an array of articles
   */
  static async listAllArticles(req, res) {
    try {
      const articlesList = await Articles.findAll({
        include: [{
          as: 'author',
          model: Users,
          attributes: ['username', 'bio', 'image']
        }],
        attributes: ['id', 'slug', 'title', 'description', 'readtime', 'body', 'tagList', 'updatedAt', 'createdAt']
      });
      return res.status(200).json({
        articles: articlesList
      });
    } catch (error) {
      return res.status(404).json({
        error: 'there is no article'
      });
    }
  }
}
export default articleManager;
