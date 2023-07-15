import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { mobileDropdownVariants } from './variants';
import { MenuLink } from '../../models/menu-link';

interface MobileMenuDropdownProps {
  items: MenuLink[];
  onClickItem: () => void;
}

const MobileMenuDropdown = ({
  items,
  onClickItem,
}: MobileMenuDropdownProps) => {
  return (
    <motion.div
      variants={mobileDropdownVariants}
      initial='close'
      animate='open'
      exit='close'
      className='flex flex-col space-y-2 overflow-hidden'
    >
      {items.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          onClick={onClickItem}
          className='w-full hover:text-white duration-200'
        >
          {item.name}
        </Link>
      ))}
    </motion.div>
  );
};

export default MobileMenuDropdown;
