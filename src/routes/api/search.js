import express from 'express';
import searchController from '../../controllers/searchController';

const router = express.Router();

router.post('/articles/search', searchController.search);

export default router;
