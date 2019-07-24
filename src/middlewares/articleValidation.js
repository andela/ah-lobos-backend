import Joi from '@hapi/joi';
import model from '../db/models/index';
import config from '../db/config/envirnoment';

const { Articles } = model;

/**
 *  rating article validaton
 */
class ArticleRatingValidation {
  /**
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {Object} ratingSchema object
    */
  static async rating(req, res, next) {
    const ratingSchema = Joi.object().keys({
      rating: Joi.number().integer().valid('1', '2', '3', '4', '5').label('Rate')
        .required()
    });
    const { rating } = req.body;
    const rate = {
      rating
    };
    const checkRating = Joi.validate(rate, ratingSchema, {
      abortEarly: false
    });
    if (checkRating.error) {
      const Errors = [];
      for (let i = 0; i < checkRating.error.details.length; i += 1) {
        Errors.push(checkRating.error.details[i].message.replace('"', ' ').replace('"', ' '));
      }
      return res.status(400).json({ Errors });
    }
    req.rate = checkRating.value;
    next();
  }

  /**
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {Object} descriptive error message
    */
  static async checkSlug(req, res, next) {
    const { slug } = req.params;
    const findArticle = await Articles.findOne({ where: { slug } });
    if (!findArticle) { return res.status(404).json({ error: 'article not found' }); }
    next();
  }

  /**
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {Object} error message
    */
  static async validArticle(req, res, next) {
    const { slug } = req.params;
    const link = `${config.host}/articles/${slug}`;
    const findOneArticle = await Articles
      .findOne({ where: { slug } });
    if (!findOneArticle) {
      return res.status(404).send({
        error: 'Article not found, please create an article first'
      });
    }
    findOneArticle.link = link;
    req.article = findOneArticle;
    next();
  }

  /**
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {Object} error message or descriptive response
    */
  static async validReportMessage(req, res, next) {
    const report = Joi.object().keys({
      message: Joi.string().min(2).max(512).required()
    });
    const { message } = req.body;
    const reporting = {
      message
    };
    const checkReporting = Joi.validate(reporting, report, {
      abortEarly: false
    });
    if (checkReporting.error) {
      const errors = [];
      for (let i = 0; i < checkReporting.error.details.length; i += 1) {
        errors.push(checkReporting.error.details[i].message.replace('"', ' ').replace('"', ' '));
      }
      return res.status(400).json({ errors });
    }
    req.reporting = checkReporting.value;
    next();
  }
}
export default ArticleRatingValidation;
