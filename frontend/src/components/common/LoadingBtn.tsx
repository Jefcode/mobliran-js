import { ReactNode } from 'react';
import Spinner from './Spinner';

interface LoadingBtnProps {
  children: ReactNode;
  loading: boolean;
  className?: string;
  onClick?: () => void;
}

const LoadingBtn = ({
  loading,
  children,
  className,
  onClick,
}: LoadingBtnProps) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={`btn disabled:bg-black/75 disabled:cursor-wait flex items-center justify-center space-s-2 ${className}`}
    >
      {loading && <Spinner className='w-5 h-5 text-white' />}
      <span>{children}</span>
    </button>
  );
};

export default LoadingBtn;
