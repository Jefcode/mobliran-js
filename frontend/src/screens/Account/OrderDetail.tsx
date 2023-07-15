import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import LoadingBtn from '../../components/common/LoadingBtn';
import Message from '../../components/common/Message';
import Meta from '../../components/common/Meta';
import Spinner from '../../components/common/Spinner';
import useOrder from '../../hooks/useOrder';
import { queryKeys } from '../../react-query/constants';
import OrderService from '../../services/OrderService';
import convertToJalali from '../../utils/convertToJalali';
import { useAccountUser } from './AccountScreen';

const OrderDetail = () => {
  const params = useParams();
  const { id: orderId } = params;
  const {
    user: { token },
  } = useAccountUser();

  // Paying order from useOrder Hook
  const {
    payOrder,
    payOrderMutation: { isLoading: payLoading },
  } = useOrder();

  // Getting order with useQuery
  const {
    data: order,
    isLoading,
    isError,
  } = useQuery([queryKeys.order, orderId], () =>
    OrderService.getOrderById({ token: token ?? '', id: orderId as string })
  );

  const payOrderHandler = () => {
    payOrder(order?._id as string);
  };

  if (isLoading) {
    return (
      <div className='py-32 text-center'>
        <Spinner className='w-20 h-20 mx-auto' />
      </div>
    );
  }

  if (isError) {
    return <Message variant='danger'>سفارش یافت نشد</Message>;
  }

  return (
    <div>
      <Meta title='جزئیات سفارش' />

      <h2 className='text-xl font-bold mb-7'>جزئیات سفارش</h2>

      {/* User Detail */}
      <div className='flex flex-col space-y-5 text-stone-700'>
        <div>
          <span>نام: </span>
          <span className='text-lightGray'>
            {order.user.firstName && order.user.lastName
              ? order?.user.firstName + ' ' + order?.user.lastName
              : order.user.username}
          </span>
        </div>
        <div className='font-both'>
          <span>ایمیل: </span>
          <span className='text-lightGray'>{order?.user.email}</span>
        </div>
        <div className='font-both'>
          <span>آدرس: </span>
          <span className='text-lightGray'>{`${order?.shippingAddress.country} - ${order?.shippingAddress.city} - ${order?.shippingAddress.address}`}</span>
        </div>

        {/* Delivery Status */}
        <Message variant='danger'>این سفارش هنوز تحویل داده نشده است.</Message>
      </div>

      {/* Divider */}
      <div className='border-b border-stone-300 my-7 w-full'></div>

      {/* Payment Method */}
      <div>
        <h2 className='text-xl font-bold mb-7'>نحوه پرداخت</h2>

        <div className='font-both mb-4'>
          <span>از طریق: </span>
          <span className='text-lightGray'>{order?.paymentMethod}</span>
        </div>

        {/* Delivery Status */}
        {order.isPaid ? (
          <Message variant='success'>
            پرداخت شده در تاریخ {convertToJalali(order.paidAt as Date)}
          </Message>
        ) : (
          <Message variant='danger'>این سفارش هنوز پرداخت نشده است.</Message>
        )}
      </div>

      {/* Divider */}
      <div className='border-b border-stone-300 my-7 w-full'></div>

      {/* Order Items */}
      <div>
        <h2 className='text-xl font-bold mb-7'>محصولات سفارش</h2>

        {/* Products Container */}
        <div className='flex flex-col mb-10'>
          {/* Order Item */}
          {order?.orderItems.map((order, idx) => (
            <div
              key={idx}
              className='flex flex-wrap items-center py-2 border-t border-t-stone-200 first:border-t-0'
            >
              {/* Image */}
              <img
                className='w-10 h-10 rounded-lg object-cover ml-8'
                src={order.product.images[0]}
                alt=''
              />

              <Link
                className='border-b border-b-slate-600 text-slate-600 hover:text-slate-900 transition'
                to={`/product/${order.product._id}`}
              >
                {order.product.title}
              </Link>

              {/* Quantity * Price = TotalPrice */}
              <div
                className='w-full mb-1 sm:mb-0 sm:w-auto sm:mr-auto text-left font-both text-sm text-slate-600'
                dir='ltr'
              >
                {order.quantity} x {order.product.price} ={' '}
                {(order.quantity * order.product.price).toLocaleString()} تومان
              </div>
            </div>
          ))}
        </div>

        {!order.isPaid && (
          <LoadingBtn onClick={payOrderHandler} loading={payLoading}>
            پرداختــــــــــــــ
          </LoadingBtn>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
