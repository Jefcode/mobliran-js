import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

// Icons
import {
  AiOutlineHeart,
  AiOutlineUser,
  AiOutlineSearch,
  AiOutlineMenu,
} from 'react-icons/ai';

// Files
import AuthModal from '../Auth/AuthModal';
import Menu from './Menu';
import MobileMenu from './MobileMenu';
import NavAccount from './NavAccount';
import CartDropdown from './CartDropdown';
import { authActions, authSelector } from '../../features/auth/authSlice';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';
import { useWishlistContext } from '../../context/WishlistContext';
import SearchDropdown from './SearchDropdown';

const Navbar = () => {
  const dispatch = useDispatch();
  const { items: cartItems } = useShoppingCartContext();
  const { items: wishlistItems } = useWishlistContext();
  const { modalOpen, user } = useSelector(authSelector);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((state) => !state);

  return (
    <nav className={`z-30 w-full bg-white`}>
      {/* Navigation Container */}
      <div className='container relative flex flex-row-reverse items-center justify-between px-6 mx-auto md:flex-row'>
        {/* Menu Flex Container */}
        <Menu />

        {/* Logo Container */}
        <div className='text-3xl'>
          <Link to='/' className='inline-block py-5'>
            <span>مبلـ</span>
            <span className='text-gray-400'> ایرانـ </span>
          </Link>
        </div>

        {/* Cart/Wishlist/account Flex Container */}
        <div className='items-stretch hidden text-sm md:flex space-s-5'>
          {/* Cart */}
          <div className='relative group'>
            <Link to='/cart' className='inline-block py-7'>
              سبد خرید{' '}
              <span className='text-gray-500'>({cartItems.length ?? 0})</span>
            </Link>

            {/* Dropdown */}
            <CartDropdown />
          </div>

          {/* Wishlist */}
          <div className='relative group'>
            <Link
              to='/wishlist'
              className='flex items-center duration-300 py-7 space-s-1 hover:text-gray-500'
            >
              <AiOutlineHeart />
              <span className='text-gray-500'>({wishlistItems.length})</span>
            </Link>
          </div>

          {/* Login */}
          {user.token ? (
            <NavAccount />
          ) : (
            <div className='relative group'>
              <span
                className='flex items-center duration-300 cursor-pointer py-7 space-s-1 hover:text-gray-500'
                onClick={() => dispatch(authActions.openModal())}
              >
                <AiOutlineUser />
                <span>ورود</span>
              </span>
            </div>
          )}

          {/* Search */}
          <div className='relative group flex items-center'>
            <button className='flex items-center h-full duration-300 space-s-1 hover:text-gray-500'>
              <AiOutlineSearch />
            </button>

            {/* Search Dropdown */}
            <SearchDropdown />
          </div>
        </div>

        {/* @Todo => Mobile Menu Button */}
        <div
          onClick={toggleMenu}
          className='flex items-center cursor-pointer space-s-2 md:hidden'
        >
          <AiOutlineMenu />
          <span>منو</span>
        </div>

        {/* Mobile Menu Portal */}
        {ReactDOM.createPortal(
          <MobileMenu open={menuOpen} toggle={toggleMenu} />,
          document.getElementById('mobile-menu') as HTMLElement
        )}

        {/* Login Form Portal */}
        {ReactDOM.createPortal(
          <AnimatePresence>{modalOpen && <AuthModal />}</AnimatePresence>,
          document.getElementById('overlay') as HTMLElement
        )}
      </div>
    </nav>
  );
};

export default Navbar;
