import ImageTitle from '../components/Partials/ImageTitle';
import useCartData from '../components/Cart/hooks/useCartData';
import CartEmpty from '../components/Cart/CartEmpty';
import CartDetail from '../components/Cart/CartDetail';
import Spinner from '../components/common/Spinner';
import Meta from '../components/common/Meta';

const CartScreen = () => {
  const {
    cartDataQuery: { data = [], isLoading, isSuccess },
    totalPrice = 0,
  } = useCartData();

  return (
    <>
      <Meta title='سبد خرید' />

      {/* Image Title */}
      <ImageTitle>سبــــــد خریــــــــــد</ImageTitle>

      {isLoading && (
        <div className='py-32 text-center'>
          <Spinner className='w-20 h-20 mx-auto' />
        </div>
      )}

      {isSuccess && data.length === 0 ? <CartEmpty /> : null}

      {isSuccess && data.length !== 0 ? (
        <CartDetail
          cartLoading={isLoading}
          cartItems={data}
          total={totalPrice}
        />
      ) : null}
    </>
  );
};

export default CartScreen;
