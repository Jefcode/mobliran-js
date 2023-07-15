import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Meta from '../../components/common/Meta';

import Spinner from '../../components/common/Spinner';
import { queryKeys } from '../../react-query/constants';
import OrderService from '../../services/OrderService';
import convertToJalali from '../../utils/convertToJalali';
import { useAccountUser } from './AccountScreen';

const Orders = () => {
  const {
    user: { token },
  } = useAccountUser();
  const { data, isLoading, isSuccess } = useQuery(
    [queryKeys.myOrders],
    () => OrderService.getMyOrders(token ?? ''),
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <>
      <Meta title='حساب کاربری | سفارش ها' />

      {/* Loading Spinner  */}
      {isLoading && (
        <div className='py-32 text-center'>
          <Spinner className='w-20 h-20 mx-auto' />
        </div>
      )}

      {/* No Orders Yet Message */}
      {isSuccess && data.length === 0 && (
        <div className='flex items-center justify-between space-s-4 border border-stone-200 px-7 py-3 text-lightGray'>
          <span>هنوز هیچ سفارشی ثبت نشده است.</span>
          {/* Browse Product Button */}
          <Link to='/' className='btn'>
            رفتن به فروشگاه
          </Link>
        </div>
      )}

      {isSuccess && data.length !== 0 && (
        <>
          <h2 className='text-xl mb-5 font-bold'>سفارش های من</h2>

          {/* Orders Table */}
          <div className='overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative sm:rounded-lg'>
            <table className='w-full text-sm text-right text-gray-500 font-both'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-100'>
                <tr>
                  <th scope='col' className='py-6 px-6'>
                    شناسه سفارش
                  </th>
                  <th scope='col' className='py-6 px-6'>
                    تاریخ
                  </th>
                  <th scope='col' className='py-6 px-6'>
                    قیمت نهایی
                  </th>
                  <th scope='col' className='py-6 px-6'>
                    وضعیت پرداخت
                  </th>
                  <th scope='col' className='py-6 px-6'>
                    وضعیت ارسال
                  </th>
                  <th scope='col' className='py-6 px-6'>
                    <span className='sr-only'>دیدن جزئیات</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((order) => (
                  <tr
                    key={order._id}
                    className='bg-white border-b last:border-b-0'
                  >
                    {/* Id */}
                    <th
                      scope='row'
                      className='text-lightGray font-english py-8 px-6 font-medium whitespace-nowrap'
                    >
                      {order._id}
                    </th>
                    {/* Date */}
                    <td className='py-8 px-6'>
                      {convertToJalali(order.createdAt ?? Date.now())}
                    </td>
                    {/* Price */}
                    <td className='py-8 px-6'>
                      {order.totalPrice.toLocaleString()} تومان
                    </td>
                    {/* Paid Status */}
                    <td className='py-8 px-6 whitespace-nowrap'>
                      {order.isPaid ? (
                        <span className='text-xs bg-green-100 rounded-full px-2 py-1 text-green-500 inline-flex items-center'>
                          <span className='w-2 h-2 inline-block rounded-full bg-green-400 ml-2 animate-pulse'></span>
                          <span>پرداخت شده</span>
                        </span>
                      ) : (
                        <span className='text-xs bg-red-100 rounded-full px-2 py-1 text-red-500 inline-flex items-center'>
                          <span className='w-2 h-2 inline-block rounded-full bg-red-400 ml-2 animate-pulse'></span>
                          <span>پرداخت نشده</span>
                        </span>
                      )}
                    </td>
                    {/* Delivery Status */}
                    <td className='py-8 px-6 whitespace-nowrap'>
                      {order.isDelivered ? (
                        <span className='text-xs bg-green-100 rounded-full px-2 py-1 text-green-500 inline-flex items-center'>
                          <span className='w-2 h-2 inline-block rounded-full bg-green-400 ml-2 animate-pulse'></span>
                          <span>ارسال شده</span>
                        </span>
                      ) : (
                        <span className='text-xs bg-red-100 rounded-full px-2 py-1 text-red-500 inline-flex items-center'>
                          <span className='w-2 h-2 inline-block rounded-full bg-red-400 ml-2 animate-pulse'></span>
                          <span>ارسال نشده</span>
                        </span>
                      )}
                    </td>
                    <td className='py-8 px-6 text-right'>
                      <Link
                        to={`${order._id}`}
                        className='font-medium text-blue-600 hover:underline'
                      >
                        جزئیات
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
