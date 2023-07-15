import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { Category } from '../../../../shared/types';
import { PriceRange, SortOptions } from './hooks/useProducts';

const listVariants = {
  close: {
    height: 0,
    marginTop: 0,
    transition: {
      type: 'tween',
    },
  },
  open: {
    height: 'auto',
    marginTop: 16,
    transition: {
      type: 'tween',
    },
  },
};

interface FilterProps {
  categories: Category[];
  selectedCategory: string | undefined;
  onChangeCategory: (category: string | undefined) => void;
  sortBy: SortOptions;
  onChangeSort: (sort: SortOptions) => void;
  priceRange: PriceRange;
  onChangePriceRange: (priceRange: PriceRange) => void;
}

const Filter = ({
  categories,
  onChangeCategory,
  selectedCategory,
  sortBy,
  onChangeSort,
  priceRange,
  onChangePriceRange,
}: FilterProps) => {
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleCategoriesListHandler = () => {
    setCategoriesOpen((state) => !state);
  };

  const toggleFiltersListHandler = () => {
    setFiltersOpen((state) => !state);
  };

  return (
    <div className='w-full mb-7 px-6 flex flex-col items-start space-y-4 md:flex-row md:space-y-0 md:items-center justify-between'>
      {/* Category */}
      <div className=''>
        {/* Category Toggle Button - For mobile */}
        <div
          onClick={toggleCategoriesListHandler}
          className='flex cursor-pointer items-center space-s-2 md:hidden'
        >
          <span>دسته بندی ها</span>
          <AiOutlineCaretDown className='text-xs' />
        </div>

        {/* Categories list */}
        <motion.div
          variants={listVariants}
          initial={categoriesOpen ? 'close' : 'open'}
          animate={categoriesOpen ? 'open' : 'close'}
          className='hidden h-0 md:!h-auto md:!flex text-stone-400 flex-col space-y-4 items-start overflow-hidden md:flex-row md:space-y-0 md:items-center md:space-s-10'
        >
          {/* Category Items Container */}
          <Link
            className={`font-light cursor-pointer hover:text-stone-700 duration-200 block ${
              selectedCategory === undefined && 'text-stone-700'
            }`}
            to={`/shop`}
          >
            همه
          </Link>

          {categories.map((category, idx) => (
            <Link
              key={idx}
              className={`block font-light cursor-pointer hover:text-stone-700 duration-200 ${
                selectedCategory !== undefined &&
                selectedCategory === category._id
                  ? 'text-stone-700'
                  : ''
              }`}
              to={`/shop?category=${category.title}`}
            >
              {category.title}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Filter */}
      <div className='relative z-20 group md:py-4 w-full md:w-auto'>
        <div
          onClick={toggleFiltersListHandler}
          className='flex items-center space-s-2 cursor-pointer'
        >
          <span>فیلتر</span>
          <AiOutlineCaretDown className='text-xs' />
        </div>

        {/* Filter Dropdown */}
        <motion.div
          layout
          variants={listVariants}
          initial={filtersOpen ? 'close' : 'open'}
          animate={filtersOpen ? 'open' : 'close'}
          className='hidden h-0 md:!h-auto opacity-100 px-0 py-0 text-stone-500  md:absolute md:top-full md:left-0 md:opacity-0 md:invisible group-hover:visible group-hover:opacity-100 md:bg-stone-900 md:text-gray-200 md:transition-all md:duration-200 md:!mt-0 md:px-5 md:py-8 md:w-[365px] overflow-hidden'
        >
          {/* Flex Container */}
          <div className='flex justify-between'>
            {/* Heading 1 */}
            <div className='w-1/2'>
              <h4 className='font-bold'>مرتب بر اساس</h4>

              {/* Sort Flex Container */}
              <div className='flex flex-col items-start text-sm mt-5 space-y-2 text-stone-400'>
                <button
                  onClick={() => onChangeSort('default')}
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    sortBy === 'default' && 'text-stone-700 md:text-stone-200'
                  }`}
                >
                  پیش فرض
                </button>
                <button
                  onClick={() => onChangeSort('popularity')}
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    sortBy === 'popularity' &&
                    'text-stone-700 md:text-stone-200'
                  }`}
                >
                  محبوبیت
                </button>
                <button
                  onClick={() => onChangeSort('new')}
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    sortBy === 'new' && 'text-stone-700 md:text-stone-200'
                  }`}
                >
                  جدید بودن
                </button>
                <button
                  onClick={() => onChangeSort('ASC')}
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    sortBy === 'ASC' && 'text-stone-700 md:text-stone-200'
                  }`}
                >
                  قیمت: کمتر به بیشتر
                </button>
                <button
                  onClick={() => onChangeSort('DESC')}
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    sortBy === 'DESC' && 'text-stone-700 md:text-stone-200'
                  }`}
                >
                  قیمت: بیشتر به کمتر
                </button>
              </div>
            </div>

            {/* Heading 1 */}
            <div className='w-1/2'>
              <h4 className='font-bold'>بازه قیمتی - تومان</h4>

              {/* Sort Flex Container */}
              <div className='flex flex-col items-start text-sm mt-5 space-y-2 text-stone-400'>
                <button
                  onClick={() => onChangePriceRange({ min: 1000, max: 500000 })}
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    priceRange.min === 1000 &&
                    priceRange.max === 500000 &&
                    'text-stone-700 md:text-stone-200'
                  }`}
                >
                  1 هزار - 500 هزار
                </button>
                <button
                  onClick={() =>
                    onChangePriceRange({ min: 500000, max: 1000000 })
                  }
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    priceRange.min === 500000 &&
                    'text-stone-700 md:text-stone-200'
                  }`}
                >
                  500 هزار - 1 میلیون
                </button>
                <button
                  onClick={() =>
                    onChangePriceRange({ min: 1000000, max: 2000000 })
                  }
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    priceRange.min === 1000000 &&
                    'text-stone-700 md:text-stone-200'
                  }`}
                >
                  1 میلیون - 2 میلیون
                </button>
                <button
                  onClick={() =>
                    onChangePriceRange({ min: 2000000, max: 5000000 })
                  }
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    priceRange.min === 2000000 &&
                    'text-stone-700 md:text-stone-200'
                  }`}
                >
                  2 میلیون - 5 میلیون
                </button>
                <button
                  onClick={() => onChangePriceRange({ min: 5000000 })}
                  className={`hover:text-stone-700 md:hover:text-stone-100 duration-200 ${
                    priceRange.min === 5000000 &&
                    'text-stone-700 md:text-stone-200'
                  }`}
                >
                  5 میلیون به بالا
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Filter;
