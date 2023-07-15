import React, { ReactNode } from 'react';

interface ImageTitleProps {
  children: ReactNode;
  img?: string;
}

const ImageTitle = ({
  children,
  img = '/images/title-img.jpg',
}: ImageTitleProps) => {
  return (
    <div className='relative w-full h-[40vw] md:h-[350px] flex items-center justify-center text-white'>
      <img
        src={img}
        className='absolute top-0 right-0 z-0 object-cover object-top w-full h-full'
        alt=''
      />

      {/* Title Container */}
      <div className='z-10'>
        <h1 className='text-5xl font-bold'>{children}</h1>
      </div>
    </div>
  );
};

export default ImageTitle;
