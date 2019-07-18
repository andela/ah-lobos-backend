import Joi from '@hapi/joi';

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
}
export default ArticleRatingValidation;
