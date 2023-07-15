import { TbBulb } from 'react-icons/tb';

const DescriptionBtn = () => {
  return (
    <div className='fixed top-50% right-0 -translate-y-50% bg-red-600 text-white flex justify-center items-center px-5 py-3 space-s-1.5 cursor-pointer text-sm'>
      <TbBulb className='text-lg' />
      <span>توضیحات</span>
    </div>
  );
};

export default DescriptionBtn;
