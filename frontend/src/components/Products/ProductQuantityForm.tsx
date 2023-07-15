import React, { useState } from 'react';
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai';
import { useShoppingCartContext } from '../../context/ShoppingCartContext';
import LoadingBtn from '../common/LoadingBtn';

interface ProductQuantityFormProps {
  productId: string;
  max: number;
  onSuccessAddingToCart?: () => void;
}

const ProductQuantityForm = ({
  max,
  productId,
  onSuccessAddingToCart,
}: ProductQuantityFormProps) => {
  const [qty, setQty] = useState(1);

  const {
    addToCart,
    addMutation: { isLoading },
  } = useShoppingCartContext();

  // Change Quantity
  const changeQtyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value > max) {
      setQty(max);
    } else {
      setQty(value);
    }
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    addToCart({ product: productId, quantity: qty }, () =>
      onSuccessAddingToCart?.()
    );
  };

  return (
    <form
      onSubmit={submitHandler}
      className='flex flex-col items-stretch my-12 space-y-3 lg:flex-row lg:space-y-0'
    >
      {/* Input Container */}
      <div className='flex justify-between w-full text-sm bg-white border lg:w-40 xl:w-52 border-stone-300 text-stone-500'>
        <span className='px-3 py-4'>تعداد</span>

        {/* Counter Container */}
        <div className='flex items-center pl-3 space-between space-s-2'>
          <AiOutlineCaretRight
            className='cursor-pointer'
            onClick={() => setQty(qty - 1 || 1)}
          />
          <input
            type='text'
            value={qty}
            onChange={changeQtyHandler}
            className='w-6 h-full text-center outline-none focus:bg-stone-100'
          />
          <AiOutlineCaretLeft
            className='cursor-pointer'
            onClick={() => setQty((currQty) => (currQty < max ? qty + 1 : qty))}
          />
        </div>
      </div>
      {/* Button */}
      <LoadingBtn loading={isLoading} className='!py-4'>
        افزودن به سبد خرید
      </LoadingBtn>
    </form>
  );
};

export default ProductQuantityForm;
