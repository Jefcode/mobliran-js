import React from 'react';

interface BackdropProps {
  onClick?: () => void;
  className?: string;
}

const Backdrop = ({ onClick, className }: BackdropProps) => {
  return (
    <div
      className={`fixed top-0 right-0 w-full bg-black/50 min-h-screen ${className}`}
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
