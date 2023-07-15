import React, { useCallback, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import Rating from '../components/common/Rating';
import ProductQuantityForm from '../components/Products/ProductQuantityForm';
import { queryKeys } from '../react-query/constants';
import ProductService from '../services/ProductService';
import Spinner from '../components/common/Spinner';
import NotFoundScreen from './NotFoundScreen';
import type { Category } from '../../../shared/types';
import AddToWishlist from '../components/Products/AddToWishlist';
import ProductReviews from '../components/Products/ProductReviews';
import Meta from '../components/common/Meta';
import RelatedProducts from '../components/Products/RelatedProducts';

const ProductDetailScreen = () => {
  const [tab, setTab] = useState('description'); // description / informations / reviews
  const [successAddToCart, setSuccessAddToCart] = useState(false);

  // Get Product Details
  const params = useParams();

  // Find this Product
  const { id: productId = '' } = params;
  const {
    data: product,
    isLoading,
    isSuccess,
    isError,
  } = useQuery([queryKeys.products, productId], () =>
    ProductService.getProductDetail(productId)
  );

  // Add To cart Success Event handler
  const successAddToCartHandler = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setSuccessAddToCart(true);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className='flex items-center justify-center h-screen'>
          <Spinner className='w-20 h-20' />
        </div>
      ) : isSuccess ? (
        // Product Detail
        <>
          <Meta title={`خرید ${product.title} | مبل ایران`} />

          {/* Imgs / Breadcrumb / Info */}
          <div className='bg-secondaryGray'>
            {/* Container */}
            <div className='container px-6 mx-auto'>
              {/* Breadcrumb Container */}
              <div className='flex flex-wrap w-full gap-4 pt-10 text-gray-400 pb-14'>
                <div className='after:content-["/"] after:mr-4 last:after:content-[""]'>
                  <Link to='/' className='transition hover:text-gray-600'>
                    خانه
                  </Link>
                </div>

                <div className='after:content-["/"] after:mr-4 last:after:content-[""]'>
                  {product?.categories.map((category, idx) => (
                    <Link
                      to={`/shop?category=${(category as Category).title}`}
                      key={idx}
                      className='transition hover:text-gray-600 after:content-["،"] mr-1 first:mr-0 last:after:content-[""] flex-inline items-center'
                    >
                      {(category as Category).title}
                    </Link>
                  ))}
                </div>

                <div className='after:content-["/"] after:mr-4 last:after:content-[""]'>
                  {product?.title}
                </div>
              </div>

              {/* Success Add To Cart Notification */}
              {successAddToCart && (
                <div className='flex flex-col items-center justify-between w-full py-5 mb-10 space-y-4 border-y border-stone-300 sm:flex-row sm:space-y-0 sm:space-s-4'>
                  <p className='text-lightGray'>
                    ({product.title}) به سبد خرید شما اضافه شد
                  </p>

                  <Link to='/cart' className='btn'>
                    دیدن سبد
                  </Link>
                </div>
              )}

              {/* Images / Info Container */}
              <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0'>
                {/* Images Half */}
                <div className='grid w-full grid-cols-4 gap-4 lg:w-1/2 md:grid-cols-5 md:grid-rows-4'>
                  {/* Main Image */}
                  <img
                    src={product?.images[0]}
                    className='order-1 object-cover w-full col-span-4 md:row-span-4 md:h-full md:order-2'
                    alt=''
                  />

                  {/* Minor Images */}
                  <img
                    src={product?.images[1]}
                    className='order-2 object-cover w-full col-span-2 row-auto sm:col-span-1 md:h-full md:order-1'
                    alt=''
                  />
                  <img
                    src={product?.images[2]}
                    className='order-3 object-cover w-full col-span-2 row-auto sm:col-span-1 md:h-full'
                    alt=''
                  />
                  <img
                    src={product?.images[3]}
                    className='order-4 object-cover w-full col-span-2 row-auto sm:col-span-1 md:h-full'
                    alt=''
                  />
                  <img
                    src={product?.images[4]}
                    className='order-5 object-cover w-full col-span-2 row-auto sm:col-span-1 md:h-full'
                    alt=''
                  />
                </div>

                {/* Info Half */}
                <div className='w-full pr-0 lg:w-1/2 lg:pr-28'>
                  {/* Title */}
                  <h1 className='text-3xl'>{product?.title}</h1>

                  {/* Price */}
                  <p className='mt-3 font-light text-gray-600'>
                    {product?.price.toLocaleString()} تومان
                  </p>

                  {/* Rating Container */}
                  <div className='flex items-center text-sm space-s-2 mt-14'>
                    {/* Stars Container */}
                    <Rating score={product.rating} />

                    <span className='text-black/50'>
                      ({product.numReviews} نظر مشتری)
                    </span>
                  </div>

                  {/* Description */}
                  <p className='mt-5 font-light text-gray-400'>
                    {product?.intro}
                  </p>

                  {/* Add To Cart Container */}
                  <ProductQuantityForm
                    productId={product._id ?? ''}
                    onSuccessAddingToCart={successAddToCartHandler}
                    max={product?.countInStock ?? 1}
                  />

                  {/* Add To wishlist */}
                  <AddToWishlist productId={product._id ?? ''} />

                  {/* ProductCode / Categories / Tags */}
                  <div className='flex flex-col space-y-1 text-sm'>
                    <div className='space-s-2'>
                      <span>کد محصول:</span>
                      <span>025</span>
                    </div>
                    <div className='space-s-2'>
                      <span>دسته بندی ها:</span>
                      {product?.categories.map((category, idx) => (
                        <React.Fragment key={idx}>
                          <Link
                            to={`/shop?category=${
                              (category as Category).title
                            }`}
                            className='text-gray-500 transition hover:text-black'
                          >
                            {(category as Category).title}
                          </Link>{' '}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className='space-s-2'>
                      <span>کلمات کلیدی:</span>
                      <a
                        href='/'
                        className='text-gray-500 transition hover:text-black'
                      >
                        جعبه
                      </a>
                      ،
                      <a
                        href='/'
                        className='text-gray-500 transition hover:text-black'
                      >
                        چوب
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              {/* Tabs */}
              <div className='pt-20 sm:pt-24 md:pt-32 text-stone-600'>
                {/* Panel Control Container */}
                <div className='flex flex-col border border-b-0 divide-y sm:inline-flex sm:flex-row border-black/15 sm:divide-y-0 sm:divide-s divide-black/15'>
                  {/* Item 1 */}
                  <div
                    onClick={() => setTab('description')}
                    className={`cursor-pointer px-10 md:px-14 py-3 ${
                      tab === 'description' && 'bg-black text-white'
                    }`}
                  >
                    توضیحات
                  </div>
                  <div
                    onClick={() => setTab('informations')}
                    className={`cursor-pointer px-10 md:px-14 py-3 ${
                      tab === 'informations' && 'bg-black text-white'
                    }`}
                  >
                    اطلاعات بیشــــتر
                  </div>
                  <div
                    onClick={() => setTab('reviews')}
                    className={`cursor-pointer px-10 md:px-14 py-3 ${
                      tab === 'reviews' && 'bg-black text-white'
                    }`}
                  >
                    نظر خریداران
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panels */}
          <div className='bg-white border border-black/15'>
            {/* Container */}
            <div className='container flex flex-col px-6 mx-auto'>
              {/* Panels */}
              {tab === 'description' ? (
                // Description Panel
                <div className='py-24'>
                  <h5 className='mb-5 text-xl'>توضیحات</h5>
                  <p className='font-light text-stone-500'>
                    {product?.description}
                  </p>
                </div>
              ) : tab === 'informations' ? (
                // Informations Panel
                <div className='py-24'>
                  <h5 className='mb-5 text-xl'>اطلاعات بیشتر</h5>

                  {/* Additional Information Table */}
                  <table className=' w-52 text-start'>
                    <tbody>
                      <tr className='text-lightGray'>
                        <th>وزن</th>
                        <td className='py-1 text-black/50'>
                          {product?.info.weight}
                        </td>
                      </tr>
                      <tr className='text-lightGray'>
                        <th>ابعــــــاد</th>
                        <td className='py-1 text-black/50' dir='ltr'>
                          {product?.info.dimentions}
                        </td>
                      </tr>
                      <tr className='text-lightGray'>
                        <th>رنگ</th>
                        <td className='py-1 text-black/50'>
                          {product?.info.colors}
                        </td>
                      </tr>
                      <tr className='text-lightGray'>
                        <th>جنس</th>
                        <td className='py-1 text-black/50'>
                          {product?.info.material}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : tab === 'reviews' ? (
                // Reviews panel
                <ProductReviews product={product} />
              ) : null}
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts id={product._id as string} />
        </>
      ) : isError ? (
        <NotFoundScreen />
      ) : null}
    </>
  );
};

export default ProductDetailScreen;
