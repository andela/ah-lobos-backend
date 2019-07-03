// eslint-disable-next-line import/no-unresolved
import joi from '@hapi/joi';

/**
 * validation middlewares
 */
class validations {
  /**
   *
   * @param {Object} _user
   * @returns { Object} email object
   */
  static checkForgotPasswordData(_user) {
    const passwordResetSchema = joi.object().keys({
      email: joi.string().email().required(),
    });
    const resetData = {
      email: _user.email,
    };
    const validateResetPassword = passwordResetSchema.validate(resetData);
    if (validateResetPassword.error) {
      return (validateResetPassword.error.details[0].message.replace('"', '').replace('"', ''));
    }
    return resetData;
  }

  /**
   *
   * @param {Object} _user
   * @returns {Object} password object
   */
  static checkResetPasswordData(_user) {
    const passwordResetSchema = joi.object().keys({
      password: joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required(),
      confirmPassword: joi.string().required(),
    });

    const resetPasswordData = {
      password: _user.password,
      confirmPassword: _user.confirmPassword
    };

    const validateResetPassword = passwordResetSchema.validate(
      resetPasswordData,
      { abortEarly: false }
    );

    if (validateResetPassword.error) {
      if (validateResetPassword.error.details[0].message.endsWith('/^[a-zA-Z0-9]{8,30}$/')) {
        return ('your password should contain at least an uppercase, lowercase and a number');
      }
      const errors = [];
      for (let i = 0; i < validateResetPassword.error.details.length; i += 1) {
        errors.push(validateResetPassword.error.details[i].message.replace('"', '').replace('"', ''));
      }
      return (errors);
    }

    if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
      return ('password doesn\'t match');
    }
    return resetPasswordData;
  }
}
export default validations;
