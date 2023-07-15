import React from 'react';
import { useSelector } from 'react-redux';
import { AiFillCaretDown } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { authSelector } from '../../features/auth/authSlice';

const NavAccount = () => {
  const { user } = useSelector(authSelector);
  const { logout } = useAuth();

  return (
    <div className='relative group'>
      <Link to='/my-account' className='flex items-center h-full'>
        {/* Avatar */}
        <img
          src='/images/avatar.png'
          className='w-6 h-6 rounded-full ml-2'
          alt='User Avatar'
        />
        <span className='ml-1 font-both'>{user.username}</span>
        <AiFillCaretDown className='w-2 h-2' />
      </Link>

      {/* Dropdown */}
      <div className='absolute -right-10 z-10 invisible text-white transition-all bg-black opacity-0 w-52 group-hover:opacity-100 group-hover:visible top-full '>
        {/* Dropdown Flex Container */}
        <ul className='flex flex-col space-y-3 p-5 py-6'>
          <li className='text-stone-400 hover:text-stone-200 transition'>
            <Link
              to='/my-account'
              className='myGroup flex items-center overflow-hidden'
            >
              حساب کاربری من
            </Link>
          </li>
          <li className='text-stone-400 hover:text-stone-200 transition'>
            <Link
              to='/my-account/edit-account'
              className='myGroup flex items-center overflow-hidden'
            >
              ویرایش پروفایل
            </Link>
          </li>
          <li className='text-stone-400 hover:text-stone-200 transition'>
            <Link
              to='/my-account/orders'
              className='myGroup flex items-center overflow-hidden'
            >
              سفارش ها
            </Link>
          </li>
          <li className='text-stone-400 hover:text-stone-200 transition'>
            <button
              onClick={() => logout()}
              className='myGroup flex items-center overflow-hidden'
            >
              خروج از حساب
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavAccount;
