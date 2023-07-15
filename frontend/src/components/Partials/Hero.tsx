// import HeroImg1 from '../images/hero-1.png';
// import HeroImg3 from '../images/hero-3.jpg';
// import HeroImg2 from '../images/hero-2.png';
import HeroImg4 from '../../images/hero-4.png';

const Hero = () => {
  return (
    <div className='container px-0 mx-auto md:px-6'>
      {/* Sliders Container */}
      <div className='w-full overflow-hidden bg-primaryGray'>
        {/* Slide 1 */}
        <div className='relative w-full h-full pb-20 md:pb-24 pt-80'>
          {/* Image */}
          <img
            src={HeroImg4}
            className='absolute top-4 left-50% -translate-x-50% w-64 md:w-80 lg:w-96 z-0 md:left-14 lg:left-[10%] md:top-50% md:translate-x-0 md:-translate-y-[55%]'
            alt=''
          />

          {/* Content */}
          <div className='z-10 flex flex-col px-10 space-y-4 md:px-20'>
            <h1 className='text-2xl font-bold text-gray-700 md:text-4xl font-heading'>
              زیبا ترین لوازم
            </h1>
            <p className='max-w-full font-light text-gray-400 md:max-w-xs lg:max-w-md'>
              توی سایت مبل ایران زیبا ترین و با کیفیت ترین لوازم خانگی ایرانی رو
              پیدا کن، مقایسه کن و از یک خرید آسون لذت ببر
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
