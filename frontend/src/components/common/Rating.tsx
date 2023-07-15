import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs';

interface RatingProps {
  score: number;
  className?: string;
}

const Rating = ({ score, className }: RatingProps) => {
  return (
    <div
      className={`flex space-s-1 items-center text-yellow-500 ${className}`}
      dir='ltr'
    >
      {score >= 1 ? <BsStarFill /> : score >= 0.5 ? <BsStarHalf /> : <BsStar />}
      {score >= 2 ? <BsStarFill /> : score >= 1.5 ? <BsStarHalf /> : <BsStar />}
      {score >= 3 ? <BsStarFill /> : score >= 2.5 ? <BsStarHalf /> : <BsStar />}
      {score >= 4 ? <BsStarFill /> : score >= 3.5 ? <BsStarHalf /> : <BsStar />}
      {score >= 5 ? <BsStarFill /> : score >= 5.5 ? <BsStarHalf /> : <BsStar />}
    </div>
  );
};

export default Rating;
