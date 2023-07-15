import { Router } from 'express';
import { getAllCategories } from '../controllers/categoryController';

const router = Router();

router.route('/').get(getAllCategories);

export default router;
