import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import QuickLook from './QuickLook';
import { Product } from '../../../../shared/types';

interface QuickLookBtnProps {
  product: Product;
  className?: string;
}

const QuickLookBtn = ({ product, className }: QuickLookBtnProps) => {
  const [quickLookOpen, setQuickLookOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setQuickLookOpen(true)}
        className={`px-5 py-1 bg-stone-900 whitespace-nowrap text-white ${className}`}
      >
        بررسی آنی
      </button>

      {ReactDOM.createPortal(
        <AnimatePresence>
          {quickLookOpen && (
            <QuickLook
              product={product}
              onClose={() => setQuickLookOpen(false)}
            />
          )}
        </AnimatePresence>,
        document.getElementById('overlay') as HTMLElement
      )}
    </>
  );
};

export default QuickLookBtn;
