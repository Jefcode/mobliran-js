import Meta from '../components/common/Meta';
import Spinner from '../components/common/Spinner';

import ImageTitle from '../components/Partials/ImageTitle';
import useWishlistData from '../components/Wishlist/hooks/useWishlistData';
import WishlistDetail from '../components/Wishlist/WishlistDetail';

const WishListScreen = () => {
  const {
    wishlistDataQuery: { data = [], isLoading, isSuccess },
  } = useWishlistData();

  return (
    <>
      <Meta title='لیست علاقه مندی ها' />

      {/* Image Title */}
      <ImageTitle>علاقه مندی ها</ImageTitle>

      {isLoading && (
        <div className='py-32 text-center'>
          <Spinner className='w-20 h-20 mx-auto' />
        </div>
      )}

      {isSuccess && data.length === 0 ? <NoItemFound /> : null}

      {/* Wish list Container */}
      {isSuccess && data.length !== 0 ? (
        <WishlistDetail products={data} />
      ) : null}
    </>
  );
};

const NoItemFound = () => {
  return (
    <div className='container mx-auto px-4 py-20'>
      <div className='text-center p-5 border-b berder-stone-200 text-lightGray '>
        هیچ محصولی به لیست علاقه مندی اضافه نشده است.
      </div>
    </div>
  );
};

export default WishListScreen;
