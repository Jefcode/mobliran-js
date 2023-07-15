import { Router } from 'express';

import {
	getAllProducts,
	getProduct,
	createProductReview,
	getRelatedProducts,
	getSearchedProducts,
} from '../controllers/productController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').get(getAllProducts);
router.get('/search/:keyword', getSearchedProducts);
router.route('/:id').get(getProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:id/related').get(getRelatedProducts);

export default router;
