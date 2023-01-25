import { FaChevronRight } from "react-icons/fa";
import EmbedLink from "./EmbedLink";

type Props = {
  //Insert Props Here
  className?: string;
  href: string;
  children: React.ReactNode;
  showDisclosure?: boolean;
  newTab?: boolean;
};

const Row = ({ className, href, children, showDisclosure, newTab }: Props) => {
  return (
    <EmbedLink
      className="p-4 justify-between gap-8 hover:bg-gray-100 w-full"
      href={href}
      newTab={newTab}
    >
      <div className="flex w-full">
        <div className="flex-grow">{children}</div>
        {showDisclosure && (
          <div className="flex items-center flex-none text-gray-300">
            <FaChevronRight />
          </div>
        )}
      </div>
    </EmbedLink>
  );
};

export default Row;
