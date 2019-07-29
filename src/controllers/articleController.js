import model from '../db/models/index';
import { dataUri } from '../middlewares/multer';
import { uploader } from '../db/config/cloudinaryConfig';
import readTime from '../helpers/readTime';
import paginate from '../helpers/paginate';
import makeObject from '../helpers/makeObject';

const {
  Users, Articles, Tag, ArticleHighlight
} = model;
/**
 * artticle controller
 */
class ArticleManager {
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
      let generateSlug = `${req.body.title} ${id} ${Math.floor(Math.random() * 10000)}`;
      while (generateSlug.match(/ /g)) generateSlug = generateSlug.replace(' ', '-');
      const newArticle = {
        title: req.body.title,
        body: req.body.body,
        description: req.body.description,
        image: req.body.image,
        authorId: id,
        tagList: (req.body.tagList ? req.body.tagList.split(',') : []),
        slug: generateSlug.toLowerCase(),
        readtime: readTime.read(req.body.body),
      };
      if (!newArticle.tagList) {
        const postNewArticle = await Articles.create(newArticle);
        return res.status(201).json({
          message: 'article created successful',
          article: postNewArticle.dataValues
        });
      }
      newArticle.tagList.forEach(async (tag) => {
        const findIfTagCreated = await Tag.findOne({ where: { tag } });
        if (!findIfTagCreated) Tag.create({ tag });
        if (findIfTagCreated) {
          Tag.update({ tagCount: findIfTagCreated.tagCount + 1 }, {
            where: { tag },
            returning: true
          });
        }
      });

      const postArticleWithtag = await Articles.create(newArticle);
      return res.status(201).json({
        message: 'article created successful',
        article: postArticleWithtag.dataValues
      });
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
   * @returns {object} acknowledgement message for delete action result
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
   * @returns {object} a single article
   */
  static async readArticle(req, res) {
    const { articleSlug } = req.params;
    const findArticle = await Articles.findOne({
      where: { slug: articleSlug },
      include: [{
        as: 'author',
        model: Users,
        attributes: ['username', 'bio', 'image']
      }],
      attributes: ['slug', 'title', 'description', 'readtime', 'body', 'tagList', 'favorited', 'favoritesCount', 'updatedAt', 'createdAt']
    });
    if (findArticle) return res.status(200).json({ article: findArticle });
    return res.status(404).json({ error: 'article not found' });
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} updated article
 */
  static async updateArticle(req, res) {
    try {
      if (req.file) {
        const result = await uploader.upload(dataUri(req).content);
        req.body.image = result.url;
      }

      const updateArticle = await req.article.update({
        title: req.body.title || req.article.title,
        description: req.body.description || req.article.description,
        body: req.body.body || req.article.body,
        tagList: req.body.tagList || req.article.tagList,
        image: req.body.image || req.article.image
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
    const pageNumber = paginate(req.query.page, req.query.pageSize);
    try {
      const articlesList = await Articles.findAll({
        offset: pageNumber.offset,
        limit: pageNumber.limit,
        include: [{
          as: 'author',
          model: Users,
          attributes: ['username', 'bio', 'image']
        }],
        attributes: ['id', 'slug', 'title', 'description', 'readtime', 'body', 'tagList', 'updatedAt', 'createdAt']
      });
      if (!articlesList.length) {
        return res.status(404).json({
          error: 'The articles requested can not be found'
        });
      }
      return res.status(200).json({
        articles: articlesList
      });
    } catch (error) {
      return res.status(500).json({
        error: 'internal server error'
      });
    }
  }

  /**
   *
   * @param {object} hasHighlighted
   * @param {integer} startFrom
   * @param {integer} stopTo
   * @returns{boolean} true/false
   */
  static checkIfHighlightedIndex(hasHighlighted, startFrom, stopTo) {
    if ((hasHighlighted.dataValues.selectFrom.includes(startFrom)
    && hasHighlighted.dataValues.selectTo.includes(stopTo))
    || (hasHighlighted.dataValues.selectFrom.includes(stopTo)
    && hasHighlighted.dataValues.selectTo.includes(startFrom))) {
      return true;
    } return false;
  }

  /**
   *
   * @param {object} hasHighlighted
   * @param {object} body
   * @param {integer} id
   * @param {string} highlightedText
   * @returns {boolean} is updated or not
   */
  static async isHighlighted(hasHighlighted, body, id, highlightedText) {
    const startFrom = body.selectFrom;
    const stopTo = body.selectTo;
    const prevSelectFrom = hasHighlighted.dataValues.selectFrom;
    const prevSelectTo = hasHighlighted.dataValues.selectTo;
    const prevHighlightedText = hasHighlighted.dataValues.highlightedText;
    const prevComment = hasHighlighted.dataValues.comment;
    const isHighlightIndecesExist = ArticleManager
      .checkIfHighlightedIndex(hasHighlighted, startFrom, stopTo);
    if (isHighlightIndecesExist) {
      prevSelectFrom.splice(prevSelectFrom.indexOf(startFrom), 1);
      prevSelectTo.splice(prevSelectTo.indexOf(stopTo), 1);
      prevHighlightedText.splice(prevHighlightedText.indexOf(highlightedText), 1);
      prevComment.splice(prevComment.indexOf(body.comment), 1);
      const createHighlightObject = makeObject
        .makeObject(prevSelectFrom, prevSelectTo, prevHighlightedText, prevComment, id);
      const updateHighlightedText = await hasHighlighted.update(createHighlightObject);
      return (updateHighlightedText.dataValues);
    } prevSelectFrom.push(body.selectFrom);
    prevSelectTo.push(body.selectTo);
    prevHighlightedText.push(highlightedText);
    prevComment.push(body.comment);
    const createHighlightObject2 = makeObject
      .makeObject(prevSelectFrom, prevSelectTo, prevHighlightedText, prevComment, id);
    const updateHighlightedText2 = await hasHighlighted.update(createHighlightObject2);
    return (updateHighlightedText2.dataValues);
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns { object } highligthed text info
   */
  static async highlightAndComment(req, res) {
    const { selectFrom, selectTo, comment } = req.body;
    const { slug } = req.params;
    let startFrom = selectFrom;
    let stopTo = selectTo;
    if (parseInt(selectTo, 10) < parseInt(selectFrom, 10)) {
      startFrom = selectTo;
      stopTo = selectFrom;
    } const selectedArticle = req.article.dataValues.body;
    const highlightedText = selectedArticle.slice(startFrom, stopTo);
    const hasHighlighted = await ArticleHighlight
      .findOne({ where: { articleSlug: slug, highlightedBy: req.user.id } });
    if (hasHighlighted !== null) {
      const reSelect = await ArticleManager
        .isHighlighted(hasHighlighted, req.body, req.user.id, highlightedText);
      return res.status(200).json(reSelect);
    } const highlightedArticleInfo = {
      articleId: req.article.dataValues.id,
      articleSlug: req.params.slug,
      selectFrom: [selectFrom],
      selectTo: [selectTo],
      highlightedBy: req.user.id,
      highlightedText: [highlightedText],
      comment: [comment],
    }; const highlights = await ArticleHighlight.create(highlightedArticleInfo);
    return res.status(200).json({ highlights });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns { object } highligthed text info
   */
  static async getHighlightedText(req, res) {
    const { id } = req.user;
    const userHighlightedText = await ArticleHighlight.findAll({
      where: {
        highlightedBy: id,
      }
    });
    if (userHighlightedText.length) {
      return res.status(200).json({
        userHighlightedText
      });
    }
    return res.status(404).json({
      error: 'no highlighted text found'
    });
  }

  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns { object } highligthed text info
   */
  static async getOneHighlightedText(req, res) {
    const { id } = req.user;
    const { slug } = req.params;
    const singleArticleHighlights = await ArticleHighlight.findOne({
      where: {
        highlightedBy: id, articleSlug: slug
      }
    });
    if (singleArticleHighlights) {
      return res.status(200).json({
        singleArticleHighlights
      });
    }
    return res.status(404).json({
      error: 'no highlighted text found'
    });
  }
}
export default ArticleManager;
