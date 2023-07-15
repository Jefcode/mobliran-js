import { axiosInstance, getJWTHeader } from './../axiosInstance/index';
import { Order } from './../../../shared/types';
import { ResultOrder } from '../models/types';

interface Token {
  token: string;
}

interface IAddOrder extends Token {
  order: Order;
}

interface IGetOrderById extends Token {
  id: string;
}

class OrderService {
  async addOrder({ order, token }: IAddOrder): Promise<Order> {
    const response = await axiosInstance.post(
      '/orders',
      order,
      getJWTHeader(token)
    );
    return response.data;
  }

  async getMyOrders(token: string): Promise<Order[]> {
    const response = await axiosInstance.get(
      '/orders/myorders',
      getJWTHeader(token)
    );
    return response.data;
  }

  async getOrderById({ token, id }: IGetOrderById): Promise<ResultOrder> {
    const response = await axiosInstance.get(
      `/orders/${id}`,
      getJWTHeader(token)
    );
    return response.data;
  }

  async updateOrderToPaid({ token, id }: IGetOrderById): Promise<ResultOrder> {
    const response = await axiosInstance.put(
      `/orders/${id}/pay`,
      {},
      getJWTHeader(token)
    );
    return response.data;
  }
}

export default new OrderService();
