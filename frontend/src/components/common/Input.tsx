import React from 'react';

type InputProps = React.HTMLProps<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      {...props}
      className={`w-full px-5 py-3 duration-200 border outline-none text-lightGray  focus:bg-stone-50 font-both border-stone-300 ${props.className}`}
    />
  );
});

export default Input;
