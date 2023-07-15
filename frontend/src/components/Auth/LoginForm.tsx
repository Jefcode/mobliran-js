import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from './schemas';
import useAuth from '../../hooks/useAuth';
import Spinner from '../common/Spinner';
import { useEffect } from 'react';
import { ILoginFormInputs } from '../../screens/Auth/LoginScreen';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  // Focus the email input once the component mounts
  useEffect(() => {
    setFocus('email', { shouldSelect: true });
  }, [setFocus]);

  // Sign in useAuth
  const {
    signIn,
    loginMutations: { isLoading },
  } = useAuth();

  const loginSubmitHandler = (data: ILoginFormInputs) => {
    signIn(data);
  };

  return (
    <form onSubmit={handleSubmit(loginSubmitHandler)}>
      <div className='space-y-3'>
        <div>
          <input
            type='email'
            id='email'
            placeholder='ایمیل'
            className={`font-both w-full px-3 py-4 border border-gray-300 outline-none placeholder:font-light focus:bg-gray-50 ${
              errors.email?.message ? '!border-red-600' : ''
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
            placeholder='رمز عبور'
            className={`font-both w-full px-3 py-4 border border-gray-300 outline-none placeholder:font-light focus:bg-gray-50 ${
              errors.password?.message ? '!border-red-600' : ''
            }`}
            {...register('password')}
          />
          <p className='text-red-600 font-light text-sm pt-1'>
            {errors.password?.message}
          </p>
        </div>

        {/* remember me */}
        <div className='flex items-center font-light text-gray-400 space-s-2'>
          <input type='checkbox' {...register('rememberMe')} />
          <span className='text-sm'>مرا به خاطر بسپار</span>
        </div>
      </div>

      <div className='mt-6'>
        {/* Lost Password */}
        <a
          href='/'
          className='block mb-4 text-sm transition text-black/50 hover:text-black'
        >
          رمز عبور خود را فراموش کرده ام
        </a>

        {/* Button */}
        <button
          className='flex items-center justify-center space-s-2 w-full px-2 py-4 text-center text-white bg-black disabled:bg-black/75 disabled:cursor-wait'
          disabled={isLoading}
        >
          {isLoading && <Spinner className='w-5 h-5 text-white' />}
          <span>ورود</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
