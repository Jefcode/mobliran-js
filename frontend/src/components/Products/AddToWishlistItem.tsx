import { useNavigate } from 'react-router-dom';
import { BiCheck } from 'react-icons/bi';
import { AiFillHeart } from 'react-icons/ai';
import { ImSpinner3 } from 'react-icons/im';
import { useWishlistContext } from '../../context/WishlistContext';
import { useState } from 'react';

interface AddToWishlistItemProps {
  productId: string;
}

const AddToWishlistItem = ({ productId }: AddToWishlistItemProps) => {
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
      className='cursor-pointer flex items-center justify-center p-2 bg-stone-600 text-white'
    >
      {isLoading ? (
        <ImSpinner3 className='animate-spin' />
      ) : shouldBrowseWishlist ? (
        <BiCheck />
      ) : (
        <AiFillHeart />
      )}
    </div>
  );
};

export default AddToWishlistItem;
