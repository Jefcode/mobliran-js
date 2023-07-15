import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { motion } from 'framer-motion';
import Backdrop from '../common/Backdrop';
import { authActions } from '../../features/auth/authSlice';

const AuthModal = () => {
  const dispatch = useDispatch();

  const [panel, setPanel] = useState('login');

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      className='relative z-50'
    >
      {/* Backdrop */}
      <Backdrop onClick={() => dispatch(authActions.closeModal())} />

      {/* Modal */}
      <div className='fixed top-50% left-50% -translate-y-50% -translate-x-50% bg-white w-80'>
        {/* Header => Login/Register Container */}
        <div className='flex'>
          <div
            className={`w-1/2 px-5 py-3 text-center ${
              panel === 'login' ? 'bg-white' : 'bg-stone-100'
            } cursor-pointer`}
            onClick={() => setPanel('login')}
          >
            ورود
          </div>
          <div
            className={`w-1/2 px-5 py-3 text-center ${
              panel === 'register' ? 'bg-white' : 'bg-stone-100'
            } cursor-pointer`}
            onClick={() => setPanel('register')}
          >
            عضویت
          </div>
        </div>

        {/* Register / Login */}
        <div className='p-7'>
          {panel === 'register' ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    </motion.div>
  );
};

export default AuthModal;
