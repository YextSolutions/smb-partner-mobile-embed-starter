import { useSearchParams } from "@remix-run/react";
import cx from "classnames";
import { useEffect } from "react";
import NavBar from "./NavBar";

type Props = {
  title?: string;
  backHref?: string;
  backLabel?: string;
  children: React.ReactNode;
  list?: boolean;
};

const Screen = ({ title, backHref, backLabel, list, children }: Props) => {
  const [searchParams] = useSearchParams();
  const hideNav = searchParams.get("hideNav");

  const primaryColor = searchParams.getAll("primaryColor") as any as string;

  const font = searchParams.getAll("font") as any as string;

  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty(
        "--primary-color",
        primaryColor
      );
    } else {
      // Default to dark gray
      document.documentElement.style.setProperty("--primary-color", "#333333");
    }
  }, [primaryColor]);

  useEffect(() => {
    if (font) {
      document.documentElement.style.setProperty("--font", font);
    }
  }, [font]);

  return (
    <div className="">
      {!hideNav && title && (
        <NavBar title={title} backHref={backHref} backLabel={backLabel} />
      )}
      <div
        className={cx("max-w-2xl mx-auto", {
          "mt-12": hideNav,
        })}
      >
        {list && <div className="flex flex-col divide-y">{children}</div>}
        {!list && (
          <div className="px-4 py-4">
            <h1 className="text-3xl font-bold mb-4">{title}</h1>
            <div className="flex flex-col gap-4">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Screen;
