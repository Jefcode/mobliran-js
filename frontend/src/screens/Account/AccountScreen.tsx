import { useSelector } from 'react-redux';
import { Link, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { User } from '../../../../shared/types';
import Meta from '../../components/common/Meta';
import ImageTitle from '../../components/Partials/ImageTitle';
import { authSelector } from '../../features/auth/authSlice';
import useAuth from '../../hooks/useAuth';

type ContextType = { user: User };

const AccountScreen = () => {
  const { user } = useSelector(authSelector);
  const { logout } = useAuth();

  if (!user.token) {
    return <Navigate to='/' replace />;
  }

  const logoutHandler = () => {
    logout();
  };

  return (
    <div>
      <Meta title='حساب کاربری' />

      {/* Image Title */}
      <ImageTitle>حساب کاربری من</ImageTitle>

      {/* Account Container */}
      <div className='container mx-auto px-6 py-24'>
        {/* Account Flex Container */}
        <div className='flex flex-col space-y-10 md:space-y-0 md:flex-row'>
          {/* Sidebar */}
          <div className='w-full md:w-1/4'>
            {/* Profile Container / Avatar + Greet + username */}
            <div className='flex flex-col items-star space-y-3 mb-10'>
              {/* Avatar Image */}
              <img
                src='/images/account-avatar.png'
                alt='Account Avatar'
                className='w-28 h-28 rounded-full'
              />
              {/* Hello Text */}
              <p className='text-3xl'>ســــــــــلام</p>
              {/* User Name */}
              <p
                className='text-lightGray text-lg font-english text-right'
                dir='ltr'
              >
                @{user.username}
              </p>
            </div>

            {/* Sidebar Menu */}
            <ul className='flex flex-col space-y-2 items-start text-lightGray'>
              <li className='w-full group'>
                <Link to='' className='group-hover:text-stone-600 duration-200'>
                  داشبورد
                </Link>
              </li>
              <li className='w-full group'>
                <Link
                  to='orders'
                  className='group-hover:text-stone-600 duration-200'
                >
                  سفارش ها
                </Link>
              </li>
              <li className='w-full group'>
                <Link
                  to='edit-address'
                  className='group-hover:text-stone-600 duration-200'
                >
                  آدرس
                </Link>
              </li>
              <li className='w-full group'>
                <Link
                  to='edit-account'
                  className='group-hover:text-stone-600 duration-200'
                >
                  ویرایش اطلاعات حساب
                </Link>
              </li>
              <li className='w-full group'>
                <button
                  onClick={logoutHandler}
                  className='group-hover:text-stone-600 duration-200'
                >
                  خروج از حساب
                </button>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className='w-full md:w-3/4'>
            <Outlet context={{ user }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export function useAccountUser() {
  return useOutletContext<ContextType>();
}

export default AccountScreen;
