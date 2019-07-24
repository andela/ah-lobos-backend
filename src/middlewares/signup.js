import Joi from '@hapi/joi';
import model from '../db/models/index';

const { Users } = model;

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
      firstName: Joi.string().regex(/^\S+/).min(4).required(),
      lastName: Joi.string().regex(/^\S+/).min(4).required(),
      username: Joi.string().regex(/^\S+$/).min(4).required()
        .options({ language: { string: { regex: { base: 'please remove spaces between word!' } } } })
        .label('Username'),
      email: Joi.string().email().insensitive().required()
        .label('Email'),
      password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({ language: { string: { regex: { base: 'must be an alphanumeric with uppercase and the length not less than 8!' } } } })
        .label('Password'),
    });
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
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
    const usernameUsed = await Users.findOne({ where: { username: user.username } });
    if (usernameUsed) return res.status(409).json({ error: 'username already taken, please try again' });
    req.user = checkUser.value;
    next();
  }
}
export default SignupValidation;
