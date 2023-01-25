import cx from "classnames";
import { FaStar } from "react-icons/fa";

type Props = {
  //Insert Props Here
  className?: string;
  rating: number;
};

const Stars = ({ className, rating }: Props) => {
  return (
    <div className={cx(className, "flex gap-2")}>
      {/* Yellow Stars */}
      {Array(rating)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="text-primary-color">
            <FaStar />
          </div>
        ))}
      {/* Gray Stars */}
      {Array(5 - rating)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="text-gray-200">
            <FaStar />
          </div>
        ))}
    </div>
  );
};

export default Stars;
