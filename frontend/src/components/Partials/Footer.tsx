import {
  BsArrowLeft,
  BsInstagram,
  BsFacebook,
  BsTwitter,
} from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      {/* Footer */}
      <footer className='w-full py-24 text-white border-t bg-darkBlack border-black/15'>
        {/* Footer Flex Container */}
        <div className='container flex flex-col items-start justify-between px-6 mx-auto space-y-14 md:space-y-0 md:flex-row'>
          {/* Customer Service */}
          <div className='w-full md:1/2 lg:w-1/4'>
            <h5 className='text-lg font-bold text-white font-heading'>
              خدمات مشتری
            </h5>

            {/* Items Flex Container */}
            <div className='flex flex-col items-start mt-6 space-y-2 text-sm text-gray-300'>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>شرایط و ضوابط</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>کار ما چیست؟</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className='w-full md:1/2 lg:w-1/4'>
            <h5 className='text-lg font-bold text-white font-heading'>شرکت</h5>

            {/* Items Flex Container */}
            <div className='flex flex-col items-start mt-6 space-y-2 text-sm text-gray-300'>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>خدمات در دسترس</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>اخرین مقالات</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span> سوالات پر تکرار</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>صفحات مجازی</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className='w-full md:1/2 lg:w-1/4'>
            <h5 className='text-lg font-bold text-white font-heading'>
              صفحات مجازی
            </h5>

            {/* Items Flex Container */}
            <div className='flex flex-col items-start mt-6 space-y-2 text-sm text-gray-300'>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>اینستاگرام</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>روبیکا</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>توییتر</span>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className='w-full md:1/2 lg:w-1/4'>
            <h5 className='text-lg font-bold text-white font-heading'>
              پروفایل
            </h5>

            {/* Items Flex Container */}
            <div className='flex flex-col items-start mt-6 space-y-2 text-sm text-gray-300'>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>حساب من</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>درخواست کمک</span>
              </a>
              <a href='/' className='flex items-center overflow-hidden group'>
                <BsArrowLeft className='ml-1 -mr-4 duration-200 ease-in-out group-hover:mr-0' />
                <span>پیگیری سفارش</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Copyright section */}
      <div className='w-full py-4 text-white border-t bg-darkBlack border-white/10'>
        {/* Copyright/Social Container */}
        <div className='container flex flex-col justify-between px-6 mx-auto space-y-3 md:flex-row md:space-y-0'>
          {/* Copyright */}
          <div className='text-sm font-thin text-gray-500'>
            &copy; 1401 مبل ایران
          </div>

          {/* Social */}
          <div className='flex items-center text-sm space-s-5'>
            <span className='font-thin text-gray-500'>ما را دنبال کنید</span>
            <a href='/' className='transition hover:text-gray-500'>
              <BsInstagram />
            </a>
            <a href='/' className='transition hover:text-gray-500'>
              <BsFacebook />
            </a>
            <a href='/' className='transition hover:text-gray-500'>
              <BsTwitter />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
