import React from 'react';
import { TfiFaceSad } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import Meta from '../components/common/Meta';

const NotFoundScreen = () => {
  return (
    <>
      <Meta title='صفحه مورد نظر یافت نشد' />

      <div className='py-32'>
        <div className='max-w-md mx-auto px-5 flex flex-col space-y-10 items-center text-center'>
          {/* Icon */}
          <TfiFaceSad className='text-6xl' />

          {/* Title */}
          <h1 className='text-3xl font-heading font-bold'>
            خــــــــــــــــــــطای 404
          </h1>

          {/* Description */}
          <p className='text-lightGray'>
            متاسفیم! صفحه ای که شما دنبال آن هستید یافت نشد. این می تواند غلط
            املایی در آدرس تایپ شده باشد یا اینکه صفحه حذف شده باشد
          </p>

          {/* Go Back to Home Page */}
          <Link
            to='/'
            className='bg-black text-white px-14 py-4 hover:bg-black/75 transition'
          >
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundScreen;
