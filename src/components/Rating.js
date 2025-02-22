import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, onClick, style }) => {
  return (
    <div className="d-inline-flex">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          onClick={() => onClick(i)}
          style={style}
          className="cursor-pointer mx-1"
          role="button"
          aria-label={`Rate ${i + 1} stars`}
        >
          {rating > i ? (
            <AiFillStar fontSize="15px" className="text-warning" />
          ) : (
            <AiOutlineStar fontSize="15px" className="text-secondary" />
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;

