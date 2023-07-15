import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Message from '../../components/common/Message';
import Spinner from '../../components/common/Spinner';
import useAuth from '../../hooks/useAuth';
import { editProfileFormSchema } from './schemas';
import { useAccountUser } from './AccountScreen';
import Meta from '../../components/common/Meta';

export interface IProfileUpdateForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

const AccountDetails = () => {
  const { user } = useAccountUser();
  const {
    updateUserProfile,
    userProfileMutations: { isLoading, isSuccess },
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProfileUpdateForm>({
    resolver: yupResolver(editProfileFormSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
    },
  });

  const submitHandler = (data: IProfileUpdateForm) => {
    updateUserProfile(data);
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
      <Meta title='حساب کاربری | ویرایش اطلاعات حساب' />

      {isSuccess && (
        <Message variant='success' className='mb-8'>
          اطلاعات حساب شما ویرایش شد
        </Message>
      )}

      {/* Edit Account Details Form */}
      <form onSubmit={handleSubmit(submitHandler)}>
        {/* Form Container */}
        <div className='space-y-5'>
          {/* Form Control / Input + Label + Possible Error message */}
          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              نام *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border outline-none focus:bg-stone-50 duration-200 ${
                errors.firstName?.message
                  ? 'border-red-500'
                  : 'border-stone-200'
              }`}
              {...register('firstName')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.firstName?.message}
            </p>
          </div>

          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              نام خانوادگی *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border outline-none focus:bg-stone-50 duration-200 ${
                errors.lastName?.message ? 'border-red-500' : 'border-stone-200'
              }`}
              {...register('lastName')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.lastName?.message}
            </p>
          </div>

          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              نام نمایشی *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border outline-none focus:bg-stone-50 duration-200 ${
                errors.username?.message ? 'border-red-500' : 'border-stone-200'
              }`}
              {...register('username')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.username?.message}
            </p>

            {/* Description for this feild */}
            <p className='text-lightGray text-sm'>
              این نامی هست که در وب سایت نمایش داده خواهد شد. مثلا در نظرات
              محصولات و حساب کاربری
            </p>
          </div>

          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              آدرس ایمیل *
            </label>
            <input
              type='text'
              className={`w-full font-both px-5 py-3 text-lightGray border outline-none focus:bg-stone-50 duration-200 ${
                errors.email?.message ? 'border-red-500' : 'border-stone-200'
              }`}
              {...register('email')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.email?.message}
            </p>
          </div>

          {/* Password */}
          <h5 className='font-bold text-black text-lg'>رمز عبور</h5>

          {/* Currrent Password */}
          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              رمز عبور فعلی (اگر مایل به تغییر نیستید، خالی بگذارید)
            </label>
            <input
              type='password'
              className={`w-full font-both px-5 py-3 text-lightGray border outline-none focus:bg-stone-50 duration-200 ${
                errors.oldPassword?.message
                  ? 'border-red-500'
                  : 'border-stone-200'
              }`}
              {...register('oldPassword')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.oldPassword?.message}
            </p>
          </div>

          {/* New Password */}
          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              رمز عبور جدید (اگر مایل به تغییر نیستید، خالی بگذارید)
            </label>
            <input
              type='password'
              className={`w-full font-both px-5 py-3 text-lightGray border outline-none focus:bg-stone-50 duration-200 ${
                errors.newPassword?.message
                  ? 'border-red-500'
                  : 'border-stone-200'
              }`}
              {...register('newPassword')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.newPassword?.message}
            </p>
          </div>

          {/* Confirm new password */}
          <div className='space-y-2'>
            <label htmlFor='' className='text-stone-700'>
              تکرار رمز عبور
            </label>
            <input
              type='password'
              className={`w-full font-both px-5 py-3 text-lightGray border outline-none focus:bg-stone-50 duration-200 ${
                errors.confirmNewPassword?.message
                  ? 'border-red-500'
                  : 'border-stone-200'
              }`}
              {...register('confirmNewPassword')}
            />
            <p className='mt-2 text-red-500 text-sm font-light'>
              {errors.confirmNewPassword?.message}
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

export default AccountDetails;
