import cx from "classnames";
import React from "react";
import EmbedLink from "./EmbedLink";

type Props = {
  //Insert Props Here
  className?: string;
  children: React.ReactNode;
  href: string;
  icon?: React.ReactNode;
  primary?: boolean;
  newTab?: boolean;
};

const Button = ({
  className,
  children,
  href,
  icon,
  primary,
  newTab,
}: Props) => {
  return (
    <EmbedLink
      href={href}
      newTab={newTab}
      className={cx(className, "btn", {
        "btn-primary": primary,
        "btn-secondary": !primary,
      })}
    >
      {icon && <div>{icon}</div>}
      <div>{children}</div>
    </EmbedLink>
  );
};

export default Button;
