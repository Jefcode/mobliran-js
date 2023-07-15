import { useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import ImageTitle from '../../components/Partials/ImageTitle';
import Meta from '../../components/common/Meta';

const AboutUsScreen = () => {
  const [tab, setTab] = useState('about');

  return (
    <>
      <Meta title='درباره ما | مبل ایران' />

      {/* Image Title */}
      <ImageTitle img='/images/title-img-about.jpg'>درباره ما</ImageTitle>

      {/* About us Container */}
      <div className='container mx-auto px-6 py-28'>
        {/* Flex Container */}
        <div className='flex flex-col space-y-10 lg:space-y-0 lg:flex-row lg:space-s-8'>
          {/* Image Half */}
          <div className='w-full lg:w-1/2'>
            <img src='/images/about-us.jpg' alt='' />
          </div>

          {/* Content Half */}
          <div className='flex-1'>
            {/* Tabs Flex Container */}
            <div className='flex flex-col items-stretch space-y-4 md:flex-row md:space-y-0 md:items-center md:space-s-3 mb-10'>
              <button
                onClick={() => setTab('about')}
                className={`${
                  tab === 'about'
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent border-stone-200'
                } border hover:bg-black hover:text-white hover:border-black transition duration-200 text-right w-full md:w-40 md:text-center px-3 py-4 outline-none`}
              >
                درباره ما
              </button>
              <button
                onClick={() => setTab('services')}
                className={`${
                  tab === 'services'
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent border-stone-200'
                } border hover:bg-black hover:text-white hover:border-black transition duration-200 text-right w-full md:w-40 md:text-center px-3 py-4 outline-none`}
              >
                خدمات
              </button>
              <button
                onClick={() => setTab('history')}
                className={`${
                  tab === 'history'
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent border-stone-200'
                } border hover:bg-black hover:text-white hover:border-black transition duration-200 text-right w-full md:w-40 md:text-center px-3 py-4 outline-none`}
              >
                تاریخچه
              </button>
            </div>

            {/* Panels Container */}
            <div id='panels' className='text-lightGray font-light'>
              {/* Panel 1 => about */}
              {tab === 'about' ? (
                <div>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی
                </div>
              ) : tab === 'services' ? (
                <div>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی و فرهنگ پیشرو در زبان فارسی ایجاد کرد
                </div>
              ) : tab === 'history' ? (
                <div>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده شناخت فراوان جامعه و متخصصان را می طلبد
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <section id='testimonials' className='bg-secondaryGray py-32'>
        {/* Container */}
        <div className='relative container mx-auto px-6'>
          {/* Heading */}
          <h4 className='max-w-md text-center mx-auto text-2xl mb-12'>
            دیگران درباره ما چه می گویند؟
          </h4>

          {/* Swiper */}
          <Swiper slidesPerView={1}>
            <SwiperNextSlide />
            <SwiperPrevSlide />

            <SwiperSlide>
              {/* Testimonial Container */}
              <div className='w-full max-w-3xl mx-auto text-center'>
                {/* Text */}
                <p className='text-lightGray font-light mb-10 px-10'>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد کتابهای زیادی
                </p>

                {/* User Name/Role */}
                <div className='space-y-1'>
                  <p>امیرحسین جعفری پناه</p>
                  <p className='text-lightGray text-sm'>دیزاینر</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {/* Testimonial Container */}
              <div className='w-full max-w-3xl mx-auto text-center'>
                {/* Text */}
                <p className='text-lightGray font-light mb-10 px-10'>
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                  استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی
                  تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده
                </p>

                {/* User Name/Role */}
                <div className='space-y-1'>
                  <p>امیرحسین جعفری پناه</p>
                  <p className='text-lightGray text-sm'>توسعه گر</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </>
  );
};

const SwiperNextSlide = () => {
  const swiper = useSwiper();

  return (
    <button
      className='absolute top-[30%] z-10 left-0 cursor-pointer'
      onClick={() => swiper.slideNext()}
    >
      <BsArrowLeft />
    </button>
  );
};

const SwiperPrevSlide = () => {
  const swiper = useSwiper();

  return (
    <button
      className='absolute top-[30%] z-10 right-0 cursor-pointer'
      onClick={() => swiper.slidePrev()}
    >
      <BsArrowRight />
    </button>
  );
};

export default AboutUsScreen;
