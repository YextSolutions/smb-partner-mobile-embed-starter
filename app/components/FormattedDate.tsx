import cx from "classnames";

type Props = {
  //Insert Props Here
  className?: string;
  dateNumber: number;
};

const FormattedDate = ({ className, dateNumber }: Props) => {
  const date = new Date(dateNumber);
  return (
    <span className={cx(className, "")}>
      {date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span>
  );
};

export default FormattedDate;
