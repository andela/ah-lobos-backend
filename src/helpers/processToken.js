import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
/**
 * generate and verify token
 */
class processToken {
  /**
   *
   * @param {object} payload
   * @returns {object} token
   */
  static async signToken(payload) {
    const token = await jwt.sign(payload, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
    return token;
  }

  /**
   *
   * @param {object} token
   * @returns {object} verified token
   */
  static async verifyToken(token) {
    const verifyToken = await jwt.verify(token, process.env.SECRET_JWT_KEY, { expiresIn: '24h' });
    return verifyToken;
  }
}
export default processToken;
