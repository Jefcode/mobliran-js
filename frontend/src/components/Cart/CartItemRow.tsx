import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { ResultCartItem } from '../../models/types';

interface CartItemRowProps {
  data: ResultCartItem;
  onRemove: (id: string) => void;
  onChangeQuantity: (id: string, qty: number) => void;
}

const CartItemRow = ({
  data,
  onRemove,
  onChangeQuantity,
}: CartItemRowProps) => {
  const dispatch = useDispatch();
  const { product, quantity } = data;
  const { _id: productId = '' } = product;
  const [qty, setQty] = useState<number>(data.quantity);

  // Notify the parent when quantity changed
  useEffect(() => {
    if (qty !== quantity) {
      onChangeQuantity(productId, qty);
    }
  }, [qty, quantity, dispatch, productId, onChangeQuantity]);

  const changeQtyHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    if (value < data.product.countInStock) {
      setQty(value);
    } else {
      setQty(data.product.countInStock);
    }
  };

  return (
    <tr>
      {/* Hidden Button */}
      <td className='w-7'>
        {/* Remove Button */}
        <IoMdClose
          onClick={() => onRemove(data.product._id ?? '')}
          className='text-gray-500 transition cursor-pointer hover:text-gray-700'
        />
      </td>

      {/* Image */}
      <td className='items-center hidden w-32 py-5 sm:flex space-s-2'>
        {/* Product Image */}
        <img
          src={data.product.images[0]}
          className='object-cover w-24 h-32'
          alt=''
        />
      </td>

      {/* Product Title */}
      <td className='w-52'>
        <Link to={`/product/${data.product._id}`} className='text-lg'>
          {data.product.title}
        </Link>
      </td>

      {/* Product Price */}
      <td className='hidden px-2 sm:table-cell'>
        <span className='font-extralight text-lightGray whitespace-nowrap'>
          {data.product.price.toLocaleString()} ت
        </span>
      </td>

      {/* Count */}
      <td className='px-2'>
        <div className='flex flex-col items-stretch my-12 space-y-3 sm:flex-row sm:space-y-0'>
          {/* Input Container */}
          <div className='flex justify-between w-full text-sm bg-white border-0 sm:border md:w-52 border-stone-300 text-stone-500'>
            <span className='hidden px-3 py-4 sm:block'>تعداد</span>

            {/* Counter Container */}
            <div className='flex items-center pl-3 space-between space-s-2'>
              <BsFillCaretRightFill
                className='cursor-pointer text-xs'
                onClick={() => setQty(qty - 1 || 1)}
              />
              <input
                type='text'
                value={qty}
                onChange={changeQtyHandler}
                className='w-6 h-full text-center outline-none focus:bg-stone-100'
              />
              <BsFillCaretLeftFill
                className='cursor-pointer text-xs'
                onClick={() =>
                  setQty(
                    qty + 1 > product.countInStock
                      ? product.countInStock
                      : qty + 1
                  )
                }
              />
            </div>
          </div>
        </div>
      </td>

      {/* Total Amount */}
      <td className='px-2 text-left'>
        <span className='font-bold text-lightGray whitespace-nowrap'>
          {(data.product.price * data.quantity).toLocaleString()} ت
        </span>
      </td>
    </tr>
  );
};

export default CartItemRow;
