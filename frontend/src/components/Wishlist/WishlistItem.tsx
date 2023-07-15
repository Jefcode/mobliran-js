import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Product } from '../../../../shared/types';
import QuickLookBtn from '../Products/QuickLookBtn';

interface WishlistItemProps {
  product: Product;
  onRemove: (id: string) => void;
}

const WishlistItem = ({ product, onRemove }: WishlistItemProps) => {
  const removeFromWishlistHandler = () => {
    onRemove(product._id as string);
  };

  return (
    <tr key={product._id} className='border-b border-stone-200'>
      {/* Hidden Button */}
      <td className='w-7'>
        {/* Remove Button */}
        <IoMdClose
          onClick={removeFromWishlistHandler}
          className='text-gray-500 transition cursor-pointer hover:text-gray-700 ml-2'
        />
      </td>

      {/* Image */}
      <td className='hidden sm:flex items-center w-32 py-5 space-s-2'>
        {/* Product Image */}
        <img
          src={product.images[0]}
          className='object-cover w-24 h-28'
          alt=''
        />
      </td>

      {/* Title/Price/InStock/AddToCart Table Cell */}
      <td className='w-full'>
        {/* Content Flex Container */}
        <div className='flex flex-col items-stretch space-y-4 lg:space-y-0 lg:flex-row lg:items-center justify-between py-3'>
          {/* Product Title */}
          <div className='flex items-center justify-between lg:justify-start'>
            <Link to={`/product/${product._id}`} className='text-xl'>
              {product.title}
            </Link>
            <QuickLookBtn
              product={product}
              className='!py-2 !px-7 mr-2 hover:bg-black/75 duration-200'
            />
          </div>

          {/* Price/InStock/AddToCart Flex Container */}
          <div className='flex space-s-5 sm:space-s-14 items-center'>
            {/* Price */}
            <div>
              <span className='text-lightGray font-light'>
                {product.price.toLocaleString()} تومان
              </span>
            </div>

            {/* InStock */}
            <div>
              <span className='text-lightGray'>
                {product.countInStock > 0 ? 'موجود' : 'ناموجود'}
              </span>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default WishlistItem;
