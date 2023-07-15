import { Router } from 'express';
import {
  addToCart,
  addToWishlist,
  authUser,
  emptyCart,
  getUserProfile,
  registerUser,
  removeFromCart,
  removeFromWishlist,
  updateCart,
  updateUserAddress,
  updateUserProfile,
  updateWishlist,
} from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.put('/profile/address', protect, updateUserAddress);
router
  .route('/cart')
  .post(protect, addToCart)
  .put(protect, updateCart)
  .delete(protect, emptyCart);
router.route('/cart/:id').delete(protect, removeFromCart);
router
  .route('/wishlist')
  .post(protect, addToWishlist)
  .put(protect, updateWishlist);
router.route('/wishlist/:id').delete(protect, removeFromWishlist);

export default router;
