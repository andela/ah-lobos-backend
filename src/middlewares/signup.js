import Joi from '@hapi/joi';

/**
 *  Signup validaton
 */
class SignupValidation {
  /**
    * @param {object} req
    * @param {object} res
    * @param {object} next
    * @returns {Object} signupSchema object
    */
  static async signupvalidator(req, res, next) {
    const signupSchema = Joi.object().keys({
      username: Joi.string().regex(/^\S+$/).min(4).required()
        .options({ language: { string: { regex: { base: 'please remove spaces between word!' } } } })
        .label('Username'),
      email: Joi.string().email().insensitive().required()
        .label('Email'),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'must be an alphanumeric with uppercase and the length not less than 8!' } } } })
        .label('Password'),
    });
    const {
      username, email, password
    } = req.body;
    const user = {
      username, email, password
    };
    const checkUser = Joi.validate(user, signupSchema, {
      abortEarly: false
    });
    if (checkUser.error) {
      const Errors = [];
      for (let i = 0; i < checkUser.error.details.length; i += 1) {
        Errors.push(checkUser.error.details[i].message.replace('"', ' ').replace('"', ' '));
      }
      return res.status(400).json({ Errors });
    }
    req.user = checkUser.value;
    next();
  }
}
export default SignupValidation;
