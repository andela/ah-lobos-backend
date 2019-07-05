import 'regenerator-runtime';
import Sequelize from 'sequelize';
import db from '../db/models';

const { BlacklistTokens } = db;
const { Op } = Sequelize;

module.exports = async () => {
  await BlacklistTokens.destroy({
    where: {
      expires: {
        [Op.lte]: Date.now()
      }
    }
  });
};
