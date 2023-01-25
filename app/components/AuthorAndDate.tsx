import FormattedDate from "./FormattedDate";

type Props = {
  //Insert Props Here
  className?: string;
  author: string;
  dateNumber: number;
};

const AuthorAndDate = ({ className, author, dateNumber }: Props) => {
  return (
    <span className="text-sm text-gray-500">
      - {author} on <FormattedDate dateNumber={dateNumber} />
    </span>
  );
};

export default AuthorAndDate;
