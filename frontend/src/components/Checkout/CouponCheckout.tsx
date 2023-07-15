import { motion } from 'framer-motion';
import { useState } from 'react';
import Input from '../common/Input';

const couponVariants = {
  closed: {
    height: 0,
  },
  open: {
    height: 'auto',
  },
};

const CouponCheckout = () => {
  const [couponOpen, setCouponOpen] = useState(false);

  return (
    <section id='coupon'>
      {/* Notice */}
      <div className='w-full px-5 mb-10 border py-7 border-stone-200 text-lightGray '>
        کد تخفیف دارید؟
        {/* Button to Toggle Coupon Section */}
        <span
          className='float-none mr-2 font-light whitespace-pre-wrap outline-none cursor-pointer sm:float-left text-stone-600'
          onClick={() => setCouponOpen(!couponOpen)}
        >
          برای وارد کردن کد خود اینجا کلیک کنید
        </span>
      </div>

      {/* Coupon Form Container */}
      <motion.div
        layout
        variants={couponVariants}
        initial='closed'
        animate={couponOpen ? 'open' : 'closed'}
        transition={{
          duration: 1,
        }}
        className='overflow-hidden'
      >
        <form>
          <p className='mb-2 text-lightGray'>
            اگر کد تخفیف دارید لطفا در زیر اعمال کنید
          </p>
          <Input placeholder='کد تخفیف' className='text-sm font-light' />
          <button className='!py-2 mt-4 btn mb-8'>اعمال کد</button>
        </form>
      </motion.div>
    </section>
  );
};

export default CouponCheckout;
