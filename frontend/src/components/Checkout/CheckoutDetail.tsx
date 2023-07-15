import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';

import { authSelector } from '../../features/auth/authSlice';
import { ResultCartItem } from '../../models/types';

import Input from '../common/Input';
import CouponCheckout from './CouponCheckout';
import checkoutFormSchema from './schema';
import useOrder from '../../hooks/useOrder';
import { Address, Order } from '../../../../shared/types';
import { useNavigate } from 'react-router-dom';
import LoadingBtn from '../common/LoadingBtn';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';

interface CheckoutDetailProps {
  cartItems: ResultCartItem[];
  totalPrice: number;
}

const SHIPPING_PRICE = 20_000;

interface ICheckoutFormInputs {
  shipToAnotherAddress: boolean;
  country: string;
  city: string;
  address: string;
  postalCode: number;

  specialNotes: string;
}

const CheckoutDetail = ({ cartItems, totalPrice }: CheckoutDetailProps) => {
  const navigate = useNavigate();
  const { items: cart } = useShoppingCartContext();
  const { user } = useSelector(authSelector);
  const [shipToAnotherAddress, setShipToAnotherAddress] = useState(
    !!!user.address?.address
  );

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICheckoutFormInputs>({
    resolver: yupResolver(checkoutFormSchema),
    defaultValues: {
      shipToAnotherAddress,
    },
  });

  // Prepare for adding order
  const {
    addOrder,
    addMutation: {
      data: createdOrder,
      isLoading: addIsLoading,
      isSuccess: addIsSuccess,
    },
  } = useOrder();

  const checkoutSubmitHandler = (data: ICheckoutFormInputs) => {
    const order: Order = {
      orderItems: cart,
      shippingAddress: shipToAnotherAddress
        ? {
            country: data.country,
            city: data.city,
            address: data.address,
            postalCode: data.postalCode,
          }
        : (user.address as Address),
      paymentMethod: 'ZarinPal',
      shippingPrice: SHIPPING_PRICE,
      totalPrice: totalPrice + SHIPPING_PRICE,
      specialNotes: data.specialNotes,
    };

    addOrder(order);
  };

  useEffect(() => {
    if (addIsSuccess) {
      navigate(`/my-account/orders/${createdOrder?._id}`);
    }
  }, [addIsSuccess, navigate, createdOrder]);

  return (
    <div className='container px-6 mx-auto py-28'>
      {/* Coupon Code Section */}
      <CouponCheckout />

      {/* Checkout Form */}
      <form onSubmit={handleSubmit(checkoutSubmitHandler)}>
        {/* Shipping Address Section */}
        <section id='shipping' className='text-stone-600'>
          <h2 className='mb-8 text-2xl text-stone-900'>اطلاعات آدرس تحویل</h2>

          {/* Check if user has already set address */}
          {user.address?.address && (
            <>
              {/* Address Data Container: If user's address is already set */}
              <div className='flex flex-col mb-8 space-y-3'>
                <p className='font-light text-lightGray'>
                  <span className='ml-1 font-bold'>کشور:</span>
                  <span>{user.address.country}</span>
                </p>

                <p className='font-light text-lightGray'>
                  <span className='ml-1 font-bold'>شهر:</span>
                  <span>{user.address.city}</span>
                </p>

                <p className='font-light text-lightGray'>
                  <span className='ml-1 font-bold'>آدرس:</span>
                  <span>{user.address.address}</span>
                </p>

                <p className='font-light text-lightGray'>
                  <span className='ml-1 font-bold'>کد پستی:</span>
                  <span>{user.address.postalCode}</span>
                </p>
              </div>
            </>
          )}

          {/* Option to change the address */}
          <div
            className={`flex items-center space-s-2 ${
              !user.address?.address && 'hidden'
            }`}
          >
            <input
              type='checkbox'
              id='shipToAnotherAddress'
              {...register('shipToAnotherAddress', {
                onChange(event) {
                  setShipToAnotherAddress(event.target.checked);
                },
              })}
            />
            <label htmlFor='shipToAnotherAddress'>ارسال به آدرسی دیگر؟</label>
          </div>

          {/* Shiping Address Container */}
          {shipToAnotherAddress && (
            <div className='mt-5 space-y-5'>
              {/* Form Control / Input + Label + Possible Error message */}
              <div className='space-y-2'>
                <label htmlFor='' className='text-stone-700'>
                  کشور *
                </label>
                <Input
                  {...register('country')}
                  className={errors.country && 'border-red-500'}
                />
                <p className='mt-1 text-red-500'>{errors.country?.message}</p>
              </div>

              <div className='space-y-2'>
                <label htmlFor='' className='text-stone-700'>
                  شهر *
                </label>
                <Input
                  {...register('city')}
                  className={errors.city && 'border-red-500'}
                />
                <p className='mt-1 text-red-500'>{errors.city?.message}</p>
              </div>

              <div className='space-y-2'>
                <label htmlFor='' className='text-stone-700'>
                  آدرس *
                </label>
                <Input
                  {...register('address')}
                  className={errors.address && 'border-red-500'}
                />
                <p className='mt-1 text-red-500'>{errors.address?.message}</p>
              </div>

              <div className='space-y-2'>
                <label htmlFor='' className='text-stone-700'>
                  کد پستی *
                </label>
                <Input
                  {...register('postalCode')}
                  className={errors.postalCode && 'border-red-500'}
                />
                <p className='mt-1 text-red-500'>
                  {errors.postalCode?.message}
                </p>
              </div>
            </div>
          )}

          {/* Special Note for delivery */}
          <div className='mt-8'>
            <p>یادداشت های سفارش (اختیاری)</p>
            <textarea
              cols={30}
              className='w-full p-4 mt-2 text-sm border h-52 border-stone-200 text-lightGray placeholder:font-light focus:outline-none focus:bg-stone-50'
              placeholder='نکات خاص درباره سفارش و تحویل'
              {...register('specialNotes')}
            ></textarea>
          </div>
        </section>

        {/* Order Details Section */}
        <section id='order-details' className='mt-10 text-stone-600'>
          {/* Section title */}
          <h2 className='mb-8 text-2xl text-stone-900'>اطلاعات سفارش</h2>

          {/* Order Table */}
          <table className='w-full text-right text-lightGray'>
            <thead>
              <tr className='border-b border-b-stone-200'>
                <th className='py-4'>محصول</th>
                <th>قیمت</th>
              </tr>
            </thead>
            <tbody className='font-light'>
              {cartItems.map((item, idx) => (
                <tr key={idx} className='border-b border-b-stone-200'>
                  <td className='py-4'>
                    {/* Product Name */}
                    <span className='ml-2'>{item.product.title}</span>
                    {/* Quantity */}
                    <span
                      className='font-bold font-both whitespace-nowrap'
                      dir='ltr'
                    >
                      {item.quantity} x
                    </span>
                  </td>
                  <td className='w-auto'>
                    {(item.product.price * item.quantity).toLocaleString()}{' '}
                    تومان
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className='font-light'>
              <tr className='border-b border-b-stone-200'>
                <th className='py-4'>مجموع</th>
                <td className='w-auto'>{totalPrice.toLocaleString()} تومان</td>
              </tr>
              <tr className='border-b border-b-stone-200'>
                <th className='py-4'>نحوه ارسال</th>
                <td className='w-auto'>
                  پست پیشتاز ({SHIPPING_PRICE.toLocaleString()} تومان)
                </td>
              </tr>
              <tr className='border-b border-b-stone-200'>
                <th className='py-4'>قیمت نهایی</th>
                <th className='w-auto'>
                  {(totalPrice + SHIPPING_PRICE).toLocaleString()}
                </th>
              </tr>
            </tfoot>
          </table>

          {/* Payment Method */}
          <div className='px-5 my-10 border border-stone-200 py-7'>
            <span className='ml-1'>پرداخت از طریق: </span>

            <span className='text-lightGray'>زرین پال</span>
          </div>

          {/* Place Order Button */}
          <LoadingBtn loading={addIsLoading}>ثبت سفارشـــــــــ</LoadingBtn>
        </section>
      </form>
    </div>
  );
};

export default CheckoutDetail;
