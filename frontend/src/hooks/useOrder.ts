import { queryKeys } from './../react-query/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

import { authSelector } from '../features/auth/authSlice';
import { Order } from './../../../shared/types';
import OrderService from '../services/OrderService';
import { useShoppingCartContext } from '../context/ShoppingCartContext';

/**
 * This Hook is responsible for managing all the
 * requests and mutations that have to do with
 * orders.
 */
export default function useOrder() {
  const queryClient = useQueryClient();
  const { emptyCart } = useShoppingCartContext();
  const { user } = useSelector(authSelector);
  const addMutation = useMutation(OrderService.addOrder);
  const payOrderMutation = useMutation(OrderService.updateOrderToPaid);

  async function addOrder(order: Order) {
    const createdOrder = await addMutation.mutateAsync({
      token: user.token ?? '',
      order,
    });

    if (createdOrder) {
      // Empty user Cart
      emptyCart();
    }
  }

  async function payOrder(id: string) {
    await payOrderMutation.mutateAsync({
      token: user.token ?? '',
      id,
    });

    queryClient.invalidateQueries([queryKeys.order, id]);
  }

  return { addMutation, addOrder, payOrderMutation, payOrder };
}
