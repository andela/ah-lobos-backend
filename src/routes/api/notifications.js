import express from 'express';
import notificationManager from '../../controllers/notificationController';
import ValidateConfig from '../../helpers/notificationConfigSchema';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/', auth.checkAuthentication, notificationManager.getNotifications);
router.put('/config', auth.checkAuthentication, ValidateConfig.notificationConfigSchema, notificationManager.updateConfig);

export default router;
