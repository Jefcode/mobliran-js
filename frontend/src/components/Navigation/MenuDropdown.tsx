import { motion } from 'framer-motion';
import { BsArrowLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';

import { MenuLink } from '../../models/menu-link';
import { dropdownVaraints } from './variants';

interface NavbarDropdownProps {
  items: MenuLink[];
}

const NavbarDropdown = ({ items }: NavbarDropdownProps) => {
  return (
    <motion.div
      variants={dropdownVaraints}
      initial='close'
      animate='open'
      exit='close'
      className='absolute top-full right-0 bg-black text-stone-400 w-60 z-10 overflow-hidden'
    >
      {/* Dropdown Flex Container */}
      <ul className='flex flex-col space-y-3 p-5 py-10'>
        {items.map((item, index) => (
          <li key={index} className='hover:text-stone-200 transition'>
            <Link
              to={item.to}
              className='group flex items-center overflow-hidden'
            >
              <BsArrowLeft className='-mr-4 ml-1 group-hover:mr-0 duration-200 ease-in-out' />
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

NavbarDropdown.defaultProps = {
  key: Math.random().toString() + Date.now().toLocaleString(),
};

export default NavbarDropdown;
