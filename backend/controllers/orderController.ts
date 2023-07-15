import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel';

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @acess   private
 */
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    specialNotes,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }

  const order = new Order({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    specialNotes,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @acess   private
 */
export const getOrderById = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName username email')
      .populate('orderItems.product', 'title images price');

    if (!order) {
      res.status(404);
      throw new Error('سفارش یافت نشد');
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(404);
    throw new Error('خطا! در یافتن سفارش مشکلی پیش آمد لطفا دوباره سعی کنید');
  }
});

/**
 * @desc    Get logged in user orders
 * @route   GET /api/orders/myorders
 * @acess   private
 */
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

/**
 * @desc    Get order by ID
 * @route   PUT /api/orders/:id/pay
 * @acess   private
 */
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'firstName lastName username email')
      .populate('orderItems.product', 'title images price');

    if (!order) {
      res.status(404);
      throw new Error('سفارش یافت نشد');
    }

    order.paidAt = new Date();
    order.isPaid = true;

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(404);
    throw new Error('خطا! در یافتن سفارش مشکلی پیش آمد لطفا دوباره سعی کنید');
  }
});
