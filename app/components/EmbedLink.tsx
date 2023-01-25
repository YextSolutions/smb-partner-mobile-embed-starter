import { Link, useSearchParams } from "@remix-run/react";
import cx from "classnames";
import React from "react";

type Props = {
  //Insert Props Here
  href: string;
  children: React.ReactNode;
  className?: string;
  newTab?: boolean;
};

const EmbedLink = ({ href, className, children, newTab }: Props) => {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  return (
    <Link
      to={`${href}?${queryString}`}
      className={cx(className, "cursor-pointer")}
      target={newTab ? "_blank" : undefined}
    >
      {children}
    </Link>
  );
};

export default EmbedLink;
