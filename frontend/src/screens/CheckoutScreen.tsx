import ImageTitle from '../components/Partials/ImageTitle';
import useCartData from '../components/Cart/hooks/useCartData';
import Spinner from '../components/common/Spinner';
import { Navigate } from 'react-router-dom';
import CheckoutDetail from '../components/Checkout/CheckoutDetail';
import Meta from '../components/common/Meta';

const CheckoutScreen = () => {
  const {
    cartDataQuery: {
      data: cartItems = [],
      isLoading: cartIsLoading,
      isSuccess: cartIsSuccess,
    },
    totalPrice,
  } = useCartData();

  return (
    <>
      <Meta title='تصفیه حساب' />

      {/* Image Title */}
      <ImageTitle>تصفیـــــــه حساب</ImageTitle>

      {/* Loading Spinner  */}
      {cartIsLoading && (
        <div className='py-32 text-center'>
          <Spinner className='w-20 h-20 mx-auto' />
        </div>
      )}

      {/* Check if Cart is not empty */}
      {cartIsSuccess && cartItems.length === 0 && <Navigate to='/cart' />}

      {/* If Cart is not empty show the checkout detail */}
      {cartIsSuccess && cartItems.length !== 0 && (
        <CheckoutDetail cartItems={cartItems} totalPrice={totalPrice ?? 0} />
      )}
    </>
  );
};

export default CheckoutScreen;
