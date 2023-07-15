import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from './schemas';
import useAuth from '../../hooks/useAuth';
import Spinner from '../common/Spinner';
import { IRegisterFormInputs } from '../../screens/Auth/RegisterScreen';

const RegisterForm = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
  });

  // useAuth
  const {
    registerMutations: { isLoading },
    signUp,
  } = useAuth();

  const registerSubmitHandler = (data: IRegisterFormInputs) => {
    signUp(data);
  };

  return (
    <form onSubmit={handleSubmit(registerSubmitHandler)}>
      <div className='space-y-3'>
        <div>
          <input
            type='text'
            id='name'
            placeholder='نام کاربری'
            className={`font-both w-full px-3 py-4 border outline-none placeholder:font-light focus:bg-gray-50 ${
              errors.username?.message ? 'border-red-600' : 'border-gray-300'
            }`}
            {...register('username')}
          />
          <p className='text-red-600 font-light text-sm pt-1'>
            {errors.username?.message}
          </p>
        </div>

        <div>
          <input
            type='text'
            id='email'
            placeholder='ایمیل'
            className={`font-both w-full px-3 py-4 border outline-none placeholder:font-light focus:bg-gray-50 ${
              errors.email?.message ? 'border-red-600' : 'border-gray-300'
            }`}
            {...register('email')}
          />
          <p className='text-red-600 font-light text-sm pt-1'>
            {errors.email?.message}
          </p>
        </div>

        <div>
          <input
            type='password'
            id='password'
            placeholder='رمز عبور'
            className={`font-both w-full px-3 py-4 border outline-none placeholder:font-light focus:bg-gray-50 ${
              errors.password?.message ? 'border-red-600' : 'border-gray-300'
            }`}
            {...register('password')}
          />
          <p className='text-red-600 font-light text-sm pt-1'>
            {errors.password?.message}
          </p>
        </div>

        <div>
          <input
            type='password'
            id='confirmPassword'
            placeholder='تکرار رمز عبور'
            className={`font-both w-full px-3 py-4 border outline-none placeholder:font-light focus:bg-gray-50 ${
              errors.confirmPassword?.message
                ? 'border-red-600'
                : 'border-gray-300'
            }`}
            {...register('confirmPassword')}
          />
          <p className='text-red-600 font-light text-sm pt-1'>
            {errors.confirmPassword?.message}
          </p>
        </div>
      </div>

      {/* Button */}
      <button
        className='btn w-full flex items-center justify-center space-s-2 !py-4 mt-6 disabled:bg-black/75 disabled:cursor-wait'
        disabled={isLoading}
      >
        {isLoading && <Spinner className='w-5 h-5 text-white' />}
        <span>ثبت نام</span>
      </button>
    </form>
  );
};

export default RegisterForm;
