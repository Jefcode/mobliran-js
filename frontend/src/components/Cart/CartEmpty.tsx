import { Link } from 'react-router-dom';

const CartEmpty = () => {
  return (
    <div className='py-24'>
      {/* Container */}
      <div className='container mx-auto px-6'>
        {/* Message */}
        <div className='text-center border border-stone-300 px-10 py-6 text-stone-700'>
          <p className='text-xl font-bold'>سبد خرید شما در حال حاضر خالی است</p>
        </div>

        {/* Description Text */}
        <p className='text-lightGray my-5'>
          چرا به فروشگاه ما برنگردی و خریدت رو شروع نکنی؟ میتونی روی لینک زیر
          کلیک کنی تا مستقیم بری به فروشگاه و از لوازم با کیفیت ما استفاده کنی.
        </p>

        <div className='text-center'>
          <Link to='/shop' className='btn !py-5 inline-block mt-8'>
            رفتن به فروشگاه
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
