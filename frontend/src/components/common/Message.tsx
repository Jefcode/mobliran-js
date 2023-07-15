import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface MessageProps {
  variant?: 'success' | 'info' | 'warning' | 'danger';
  className?: string;
  children?: ReactNode;
  cta?: string;
  to?: string;
}

const Message = ({
  variant = 'info',
  children,
  className,
  cta,
  to,
}: MessageProps) => {
  let elementClass: string;

  switch (variant) {
    case 'info':
      elementClass = 'w-full bg-black';
      break;

    case 'danger':
      elementClass = 'w-full bg-[#D7BFBB]';
      break;

    case 'warning':
      elementClass = 'w-full bg-slate-100 text-slate-700';
      break;

    default:
      elementClass = 'w-full bg-[#8A957E]';
      break;
  }

  return (
    <div
      className={`${elementClass} text-lg px-10 py-7 text-white flex flex-wrap items-center justify-between font-bold gap-3 ${className}`}
    >
      <p className='font-medium'>{children}</p>

      {cta && (
        <Link
          to={to ?? ''}
          className='block px-8 py-2 border border-white hover:bg-white hover:text-black transition'
        >
          {cta}
        </Link>
      )}
    </div>
  );
};

export default Message;
