import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Meta from '../components/common/Meta';
import useCategoriesData from '../components/Navigation/hooks/useCategoriesData';
import Filter from '../components/Products/Filter';
import {
  PriceRange,
  SortOptions,
  useProducts,
} from '../components/Products/hooks/useProducts';
import Products from '../components/Products/Products';

const ShopScreen = () => {
  // Get the category in url if exits
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const categoryTitle = search.get('category');

  const { categories } = useCategoriesData();
  const categoryId = categories.find(
    (category) => category.title === categoryTitle
  )?._id;

  // Get products
  const {
    productsQuery: { data: products = [], isLoading, isError },
    category,
    sortBy,
    priceRange,
    setCategory,
    setSortBy,
    setPriceRange,
  } = useProducts(categoryId);

  // Change the category everytime categoryId (category in url) changes
  useEffect(() => {
    setCategory(categoryId);
  }, [categoryId, setCategory]);

  // Changing Category event in Filter
  const categoryChangeHandler = (category: string | undefined) => {
    setCategory(category);
  };

  // Changing sort method in Filter
  const changeSortHandler = (sort: SortOptions) => {
    setSortBy(sort);
  };

  // Changing Price Event in Filter
  const priceRangeChangeHandler = (priceRange: PriceRange) => {
    setPriceRange(priceRange);
  };

  return (
    <>
      {/* Meta */}
      <Meta title='فروشگاه | مبل ایران' />

      {/* Breadcrumb */}
      <div className='w-full py-8 bg-stone-100'>
        <div className='container px-6 mx-auto'>
          <div className='flex flex-wrap w-full gap-4 text-gray-400'>
            <div className='after:content-["/"] after:mr-4 last:after:content-[""]'>
              <Link to='/' className='transition hover:text-gray-600'>
                خانه
              </Link>
            </div>

            <div className='after:content-["/"] after:mr-4 last:after:content-[""]'>
              فروشگاه
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <section id='products' className='mt-5 md:mt-14 mb-14'>
        {/* Container */}
        <div className='container mx-auto'>
          <Filter
            categories={categories}
            selectedCategory={category}
            onChangeCategory={categoryChangeHandler}
            sortBy={sortBy}
            onChangeSort={changeSortHandler}
            priceRange={priceRange}
            onChangePriceRange={priceRangeChangeHandler}
          />

          {/* Products Flex Container */}
          <Products
            products={products}
            isLoading={isLoading}
            isError={isError}
          />
        </div>
      </section>
    </>
  );
};

export default ShopScreen;
