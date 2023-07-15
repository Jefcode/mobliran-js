import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CartItem, Product } from '../../../../shared/types';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';
import AddToWishlistItem from './AddToWishlistItem';
import QuickLookBtn from './QuickLookBtn';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const { items } = useShoppingCartContext();
  const {
    addToCart,
    addMutation: { isLoading },
  } = useShoppingCartContext();

  // Item in cart?
  const productInCart = !!items.find(
    (p) => p.product === (product._id as string)
  );

  const addToCartHandler = () => {
    // Check if product is already in cart
    if (productInCart) {
      navigate('/cart');
      return;
    }

    const item: CartItem = { product: product._id ?? '', quantity: 1 };

    addToCart(item, () => setIsSuccess(true));
  };

  return (
    <div className='w-full px-5 group sm:w-1/2 md:w-1/3 lg:w-1/4'>
      {/* Image Container */}
      <div className='relative overflow-hidden'>
        <Link to={`/product/${product._id}`}>
          <img className='w-full' src={product.images[0]} alt={product.title} />
        </Link>

        {/* Quick Look / Whislist flex container */}
        <div className='translate-y-[105%] group-hover:translate-y-0 transition absolute bottom-0 right-50% translate-x-50%  text-white flex text-xs'>
          {/* Quick look */}
          <QuickLookBtn product={product} />

          {/* Wishlist */}
          <AddToWishlistItem productId={product._id ?? ''} />
        </div>
      </div>

      {/* Info */}
      <div className='mt-4 mb-20 space-y-1 text-center'>
        {/* Product Title */}
        <p>{product.title}</p>

        {/* Price/AddToCart Container */}
        <div className='relative'>
          <p className='absolute right-50% translate-x-50% text-sm text-stone-400 group-hover:right-0 group-hover:opacity-0 transition-all duration-500'>
            {product.price.toLocaleString()} ت
          </p>
          <button
            onClick={addToCartHandler}
            className='absolute left-0 -translate-x-50% last:text-sm text-stone-400 hover:text-stone-700 opacity-0 group-hover:left-50% group-hover:opacity-100 transition-all duration-500 whitespace-nowrap disabled:cursor-wait'
            disabled={isLoading}
          >
            {productInCart || isSuccess
              ? 'دیدن سبد خرید'
              : isLoading
              ? 'در حال افزودن'
              : 'اضافه کردن به سبد خرید'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
