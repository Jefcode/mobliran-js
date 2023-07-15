import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineCaretLeft } from 'react-icons/ai';

import MobileMenuDropdown from './MobileMenuDropdown';
import Backdrop from '../common/Backdrop';
import { authActions, authSelector } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';
import useCategoriesData from './hooks/useCategoriesData';
import { MenuLink } from '../../models/menu-link';

interface MobileMenuProps {
  open: boolean;
  toggle: () => void;
}

const MobileMenu = ({ open, toggle }: MobileMenuProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  // States
  const [shopSubmenuOpen, setShopSubmenuOpen] = useState(false);
  const [pagesSubmenuOpen, setPagesSubmenuOpen] = useState(false);

  // Get categories
  const { categories } = useCategoriesData();

  const toggleShopSubmenu = () => setShopSubmenuOpen((state) => !state);
  const togglePagesSubmenu = () => setPagesSubmenuOpen((state) => !state);

  const openAuthModalHandler = () => {
    // open auth modal
    dispatch(authActions.openModal());

    // close mobile menu
    setTimeout(toggle, 500);
  };

  /**
   * Dropdown items
   */
  const shopDropdownItems: MenuLink[] = categories.map((category) => ({
    name: category.title,
    to: `/shop?category=${category.title}`,
  }));

  // Add a hard coded dropdown item
  shopDropdownItems.unshift({ name: 'همه محصولات', to: '/shop' });

  const pagesDropdownItesm = [
    {
      name: 'درباره ما',
      to: '/about-us',
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <Backdrop className='z-40 !bg-transparent md:hidden' onClick={toggle} />
      )}

      {/* Menu */}
      <div
        className={`block md:hidden fixed top-0 right-0 w-full sm:w-96 h-full bg-[#111111] text-white z-50 transition ease-out duration-300 py-32 px-10 overflow-hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div
          className='fixed text-2xl cursor-pointer top-10 right-10'
          onClick={toggle}
        >
          <IoMdClose />
        </div>

        {/* Items Container */}
        <div className='flex flex-col items-start h-full space-y-5 overflow-y-auto no-scrollbar text-stone-400'>
          {/* Menu Item 1 */}
          <div className='relative w-full'>
            <Link
              to='/'
              onClick={toggle}
              className='flex items-center w-full text-2xl text-white duration-200 hover:text-white space-s-1'
            >
              <span>خانه</span>
            </Link>
          </div>

          {/* Menu Item 2 */}
          <div className='relative w-full'>
            <span
              className='flex items-center w-full text-2xl duration-200 cursor-pointer hover:text-white space-s-1'
              onClick={toggleShopSubmenu}
            >
              <span>فروشـــــگاه</span>
              <AiOutlineCaretLeft
                className={`text-xs duration-200 ${
                  shopSubmenuOpen && '-rotate-90'
                }`}
              />
            </span>

            {/* Submenu Container (Dropdown) */}
            <AnimatePresence>
              {shopSubmenuOpen && (
                <MobileMenuDropdown
                  items={shopDropdownItems}
                  onClickItem={toggle}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Menu Item 3 */}
          <div className='relative w-full'>
            <span
              className='flex items-center w-full text-2xl duration-200 cursor-pointer hover:text-white space-s-1'
              onClick={togglePagesSubmenu}
            >
              <span>صفحـــات</span>
              <AiOutlineCaretLeft
                className={`text-xs duration-200 ${
                  pagesSubmenuOpen && '-rotate-90'
                }`}
              />
            </span>

            {/* Submenu Container (Dropdown) */}
            <AnimatePresence>
              {pagesSubmenuOpen && (
                <MobileMenuDropdown
                  items={pagesDropdownItesm}
                  onClickItem={toggle}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <div className='relative w-full'>
            <Link
              to='/cart'
              onClick={toggle}
              className='flex items-center w-full text-2xl duration-200 hover:text-white space-s-1'
            >
              <span>سبد خرید</span>
            </Link>
          </div>

          {/* Login / Account */}
          {!user.token ? (
            <div className='relative w-full'>
              <span
                onClick={openAuthModalHandler}
                className='flex items-center w-full text-2xl duration-200 cursor-pointer hover:text-white space-s-1'
              >
                <span>ورود / عضویــــت</span>
              </span>
            </div>
          ) : (
            <div className='relative w-full'>
              <Link
                to='/my-account'
                onClick={toggle}
                className='flex items-center w-full text-2xl duration-200 hover:text-white space-s-1'
              >
                <span>حساب کاربری</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
