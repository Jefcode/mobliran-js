import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { editAddressFormSchema } from './schemas';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../components/common/Spinner';
import Message from '../../components/common/Message';
import { useEffect } from 'react';
import { useAccountUser } from './AccountScreen';
import Meta from '../../components/common/Meta';

interface IFormInputs {
  country: string;
  city: string;
  address: string;
  postalCode: number;
}

const EditAddress = () => {
  // User address Data
  const { user } = useAccountUser();

  const {
    updateUserAddress,
    userAddressMutations: { isLoading, isSuccess },
  } = useAuth();

  // React Hook Form Registration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(editAddressFormSchema),
    defaultValues: {
      country: user.address?.country,
      city: user.address?.city,
      address: user.address?.address,
      postalCode: user.address?.postalCode,
    },
  });

  const submitHandler = (data: IFormInputs) => {
    updateUserAddress(data);
  };

  // Scroll to top when isSuccess is true
  useEffect(() => {
    if (isSuccess) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [isSuccess]);

  return (
    <div>
      <Meta title='حساب کاربری | آدرس' />

      <p className='text-lightGray'>
        آدرس زیر به صورت پیش فرض در فرایند خرید استفاده خواهد شد.
      </p>

      {isSuccess && (
        <Message variant='success' className='mt-8'>
          اطلاعات با موفقیت ثبت شدند.
        </Message>
      )}

      {/* Page Title */}
      <h1 className='text-2xl mt-10 mb-2 font-semibold'>آدرس محل تحویل</h1>

      {/* Shipping Address Form */}
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* Form Container */}
        <div className='space-y-5'>
          {/* Form Control / Input + Label + Possible Error message */}
          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              کشور *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border  outline-none focus:bg-stone-50 duration-200 ${
                errors.country?.message ? 'border-red-500' : 'border-stone-200'
              }`}
              {...register('country')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.country?.message}
            </p>
          </div>

          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              شهر *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border  outline-none focus:bg-stone-50 duration-200 ${
                errors.city?.message ? 'border-red-500' : 'border-stone-200'
              }`}
              {...register('city')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.city?.message}
            </p>
          </div>

          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              آدرس *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border  outline-none focus:bg-stone-50 duration-200 ${
                errors.address?.message ? 'border-red-500' : 'border-stone-200'
              }`}
              {...register('address')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.address?.message}
            </p>
          </div>

          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              کد پستی *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border  outline-none focus:bg-stone-50 duration-200 ${
                errors.postalCode?.message
                  ? 'border-red-500'
                  : 'border-stone-200'
              }`}
              {...register('postalCode')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.postalCode?.message}
            </p>
          </div>
        </div>

        {/* Submittion Button */}
        <button
          className='btn mt-5 flex items-center justify-center space-s-2 disabled:bg-black/75'
          disabled={isLoading}
        >
          {isLoading && <Spinner className='w-5 h-5' />}
          <span>ثبت اطلاعــــــــــات</span>
        </button>
      </form>
    </div>
  );
};

export default EditAddress;
