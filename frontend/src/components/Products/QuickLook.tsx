import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { AiOutlineHeart } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';

// Import Swiper styles
import 'swiper/css';

import { Product } from '../../../../shared/types';
import Backdrop from '../common/Backdrop';
import Rating from '../common/Rating';
import ProductQuantityForm from './ProductQuantityForm';

interface QuickLookProps {
  product: Product;
  onClose: () => void;
}

const quickLookVariants = {
  closed: {
    opacity: 0,
  },
  open: { opacity: 1 },
};

const QuickLook = ({ product, onClose }: QuickLookProps) => {
  const successAddingToCartHandler = () => {
    toast.success(`(${product.title}) به سبد شما اضافه شد.`, {
      className: 'font-both',
    });
  };

  return (
    <motion.div
      layout
      variants={quickLookVariants}
      initial='closed'
      animate='open'
      exit='closed'
      className='fixed top-0 right-0 z-50 flex items-center justify-center w-screen h-screen'
    >
      {/* Backdrop */}
      <Backdrop onClick={onClose} />

      {/* Quick Look Container */}
      <div className='relative z-50 bg-white max-w-[1000px] w-[90%] h-auto max-h-[95%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-100'>
        {/* Flex Container */}
        <div className='flex flex-col items-stretch md:flex-row'>
          {/* Images Half */}
          <div className='w-full md:w-1/2'>
            {/* Image Slider */}
            <div className='relative w-full h-full'>
              <Swiper slidesPerView={1} className='h-full'>
                <SwiperPrevButton />
                <SwiperNextButton />

                {product.images.map((image, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={image}
                      alt={product.title}
                      className='object-cover w-full h-full'
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Content Half */}
          <div className='w-full md:w-1/2'>
            {/* Content Container */}
            <div className='p-10'>
              {/* Title */}
              <h1 className='text-3xl'>{product?.title}</h1>

              {/* Price */}
              <p className='mt-3 font-light text-gray-600'>
                {product?.price.toLocaleString()} تومان
              </p>

              {/* Rating Container */}
              <div className='flex items-center text-sm space-s-2 mt-14'>
                {/* Stars Container */}
                <Rating score={3.6} />

                <span className='text-black/50'>(10 نظر مشتری)</span>
              </div>

              {/* Description */}
              <p className='mt-5 text-sm font-light text-gray-400'>
                {product?.intro}
              </p>

              {/* Add To Cart Form */}
              <ProductQuantityForm
                productId={product._id ?? ''}
                onSuccessAddingToCart={successAddingToCartHandler}
                max={product.countInStock}
              />

              {/* Add To wishlist */}
              <div className='flex items-center cursor-pointer space-s-2'>
                <AiOutlineHeart />
                <span>اضافه کردن به علاقه مندی ها</span>
              </div>
            </div>
          </div>
        </div>

        {/* Close icon */}
        <button className='absolute z-50 top-5 left-5' onClick={onClose}>
          <GrFormClose className='w-5 h-5' />
        </button>
      </div>
    </motion.div>
  );
};

const SwiperPrevButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className='absolute right-5 top-50% -translate-y-50% z-50 text-lg outline-none text-stone-600 hover:text-stone-400 transition'
    >
      <BsArrowRight />
    </button>
  );
};

const SwiperNextButton = () => {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className='absolute left-5 top-50% -translate-y-50% z-50 text-lg outline-none text-stone-600 hover:text-stone-400 transition'
    >
      <BsArrowLeft />
    </button>
  );
};

export default QuickLook;
