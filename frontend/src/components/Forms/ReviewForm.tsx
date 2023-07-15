import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { BsStarFill, BsStar } from 'react-icons/bs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ProductService from '../../services/ProductService';
import LoadingBtn from '../common/LoadingBtn';
import { useSelector } from 'react-redux';
import { authSelector } from '../../features/auth/authSlice';
import Message from '../common/Message';
import { queryKeys } from '../../react-query/constants';

// yup schema
const reviewSchema = yup.object({
  comment: yup.string().trim().required('این فیلد الزامی است'),
});

// Interfaces
interface ReviewFormProps {
  productId: string;
}

interface IFormInputs {
  comment: string;
}

const ReviewForm = ({ productId }: ReviewFormProps) => {
  const queryClient = useQueryClient();
  const { user } = useSelector(authSelector);
  const [rating, setRating] = useState(1);

  // React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(reviewSchema),
  });

  const {
    isLoading,
    isSuccess,
    mutate: createReview,
  } = useMutation(ProductService.createReview, {
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries([queryKeys.products, productId]);
    },
  });

  const ratingHandler = (e: React.MouseEvent) => {
    const element = (e.target as Element).closest('div') as HTMLElement;
    const value = parseInt(element.dataset.value ?? '1');

    setRating(value);
  };

  const submitHandler = (data: IFormInputs) => {
    const review = { rating, comment: data.comment };
    createReview({ token: user.token ?? '', id: productId, data: review });
  };

  return (
    <>
      {/* check if user is logged in */}
      {!user.token ? (
        <Message cta='ورود' to={`/auth/login?redirect=/product/${productId}`}>
          برای ثبت نظر وارد حساب خود شوید
        </Message>
      ) : (
        <form onSubmit={handleSubmit(submitHandler)}>
          <h5 className='text-lg mb-5 font-bold'>ثبت بازخورد</h5>

          {isSuccess && (
            <Message className='mb-5' variant='success'>
              نظر شما با موفقیت ثبت شد
            </Message>
          )}

          {/* Rating */}
          <div className='space-y-3'>
            <label htmlFor='' className='block'>
              رتبـــــه *
            </label>
            <div className='inline-flex items-center space-s-2 text-sm'>
              <div
                className='cursor-pointer'
                onClick={ratingHandler}
                data-value='1'
              >
                {rating >= 1 ? <BsStarFill /> : <BsStar />}
              </div>
              <div
                className='cursor-pointer'
                onClick={ratingHandler}
                data-value='2'
              >
                {rating >= 2 ? <BsStarFill /> : <BsStar />}
              </div>
              <div
                className='cursor-pointer'
                onClick={ratingHandler}
                data-value='3'
              >
                {rating >= 3 ? <BsStarFill /> : <BsStar />}
              </div>
              <div
                className='cursor-pointer'
                onClick={ratingHandler}
                data-value='4'
              >
                {rating >= 4 ? <BsStarFill /> : <BsStar />}
              </div>
              <div
                className='cursor-pointer'
                onClick={ratingHandler}
                data-value='5'
              >
                {rating >= 5 ? <BsStarFill /> : <BsStar />}
              </div>
            </div>
          </div>

          {/* Review */}
          <div className='mt-4 space-y-3 w-full max-w-2xl'>
            <label htmlFor='' className='block'>
              نظر شما *
            </label>
            <textarea
              {...register('comment')}
              className={`w-full border focus:outline-none focus:bg-gray-50 py-4 px-5 text-gray-500 h-60 ${
                errors.comment ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            <p className='text-red-500 text-sm'>{errors.comment?.message}</p>
          </div>

          {/* Submit Button */}
          <LoadingBtn className='mt-3' loading={isLoading}>
            ثبت نظر
          </LoadingBtn>
        </form>
      )}
    </>
  );
};

export default ReviewForm;
