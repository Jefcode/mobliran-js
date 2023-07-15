import { useNavigate } from 'react-router-dom';
import { FormEvent, useState } from 'react';
import { CgArrowLeft } from 'react-icons/cg';

const SearchDropdown = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState<string>('');

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (keyword.trim() === '') return;

    navigate(`/search/${keyword}`);
  };

  return (
    <div className='opacity-0 invisible group-focus-within:opacity-100 group-focus-within:visible duration-300 absolute top-full left-0 w-80 bg-black px-5 text-stone-400 z-30'>
      <form
        onSubmit={submitHandler}
        className='flex items-center justify-between space-s-2'
      >
        <input
          type='text'
          className='bg-transparent outline-none text-white placeholder:text-stone-400 placeholder:font-light flex-1 font-both py-4'
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='کلمه کلیدی ای را وارد کنید'
        />
        <button>
          <CgArrowLeft className='text-xl' />
        </button>
      </form>
    </div>
  );
};

export default SearchDropdown;
