import { useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { ImSpinner3 } from 'react-icons/im';
import { useWishlistContext } from '../../context/WishlistContext';
import { useState } from 'react';

interface AddToWishlistProps {
  productId: string;
}

const AddToWishlist = ({ productId }: AddToWishlistProps) => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    items,
    addToWishlist,
    addMutation: { isLoading },
  } = useWishlistContext();

  // Check if item is in wishlist already
  const inWishlist: boolean = !!items.find((p) => {
    return p.product === productId;
  });

  const shouldBrowseWishlist: boolean = isSuccess || inWishlist;

  const addHandler = () => {
    if (shouldBrowseWishlist) {
      navigate('/wishlist');
      return;
    }

    addToWishlist(productId, () => setIsSuccess(true));
  };

  return (
    <div
      onClick={addHandler}
      className='z-0 inline-flex items-center cursor-pointer mb-14 space-s-2 relative'
    >
      {isLoading ? (
        <>
          <ImSpinner3 className='animate-spin text-stone-500' />
          <span className='text-stone-500 '>در حال اضافه کردن</span>
        </>
      ) : shouldBrowseWishlist ? (
        <>
          <AiFillHeart />
          <span>دیدن لیست علاقه مندی</span>
        </>
      ) : (
        <>
          <AiOutlineHeart />
          <span>اضافه کردن به علاقه مندی ها</span>
        </>
      )}
    </div>
  );
};

export default AddToWishlist;
