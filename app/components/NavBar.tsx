import cx from "classnames";
import { FaChevronLeft } from "react-icons/fa";
import EmbedLink from "./EmbedLink";

type Props = {
  //Insert Props Here
  className?: string;
  title: string;
  backLabel?: string;
  backHref?: string;
};

const NavBar = ({ className, title, backLabel = "Back", backHref }: Props) => {
  return (
    <div
      className={cx(
        className,
        "bg-gray-100 py-2 border-b shadow-sm flex  gap-3"
      )}
    >
      <div className="max-w-2xl w-full flex items-center justify-between mx-auto">
        <div className="">
          {backHref && (
            <EmbedLink href={backHref}>
              <div className="flex px-2 items-center gap-1 text-gray-500">
                <FaChevronLeft />
                <div className="line-clamp-1">{backLabel}</div>
              </div>
            </EmbedLink>
          )}
        </div>
        <div className="text-center text-lg font-bold">{title}</div>
        <div className="w-24"></div>
      </div>
    </div>
  );
};

export default NavBar;
