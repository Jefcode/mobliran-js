import React from 'react';
import { Product } from '../../../../shared/types';
import convertToJalali from '../../utils/convertToJalali';
import Message from '../common/Message';
import Rating from '../common/Rating';
import ReviewForm from '../Forms/ReviewForm';

interface ProductReviewsProps {
  product: Product;
}

const ProductReviews = ({ product }: ProductReviewsProps) => {
  return (
    <div className='py-24 max-w-2xl'>
      <h5 className='mb-5 text-xl font-bold'>
        {product.numReviews} نظر برای {product?.title}
      </h5>
      {/* Comments Container */}
      <div className='flex flex-col mb-8 space-y-8'>
        {product.reviews.length === 0 && (
          <Message variant='warning' className='mb-4'>
            هنوز هیچ نظری ثبت نشده است. شما اولین نفر باشید
          </Message>
        )}

        {/* Comment Item */}
        {product.reviews.map((review) => (
          <div className='flex items-start space-s-4'>
            {/* User Avatar */}
            <img
              src='/images/avatar.png'
              className='object-cover w-14 h-14'
              alt=''
            />

            {/* Comment Info */}
            <div className='flex flex-col items-start space-y-3'>
              <Rating score={review.rating} className='text-sm' />

              {/* User name / Comment Date */}
              <div className='flex space-s-2 text-lightGray'>
                <h6 className='font-bold font-english'>{review.name}</h6>

                <span className=''>
                  - {convertToJalali(review.createdAt as Date)}
                </span>
              </div>

              {/* Comment Text */}
              <p className='font-light text-lightGray'>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Review Form Container */}
      <ReviewForm productId={product._id as string} />
    </div>
  );
};

export default ProductReviews;
