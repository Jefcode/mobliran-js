import { updateOrderToPaid } from '../controllers/orderController.js';
import { Router } from 'express';
import {
	addOrderItems,
	getMyOrders,
	getOrderById,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/').post(protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);

export default router;
