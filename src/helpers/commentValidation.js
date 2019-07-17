import Joi from '@hapi/joi';

/**
 *  Comment validaton
 */
class ValidationComments {
  /**
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {Object} commentschema object
    */
  static async commentValidation(req, res, next) {
    const commentschema = Joi.object().keys({
      body: Joi.string().min(1).required()
        .label('Comment Message'),
    });
    const { body } = req.body;
    const comment = { body };
    const checkComment = Joi.validate(comment, commentschema, { abortEarly: false });
    if (checkComment.error) {
      const Errors = [];
      for (let i = 0; i < checkComment.error.details.length; i += 1) {
        // push all errors at the same time
        Errors.push(checkComment.error.details[i].message.replace('"', ' ').replace('"', ' '));
      }
      return res.status(400).json({ Errors });
    }
    req.comment = checkComment.value;
    next();
  }
}
export default ValidationComments;
