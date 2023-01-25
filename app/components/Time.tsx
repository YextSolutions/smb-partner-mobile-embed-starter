type Props = {
  //Insert Props Here
  className?: string;
  time: string;
};

const Time = ({ className, time }: Props) => {
  const date = new Date(`2022-01-01 ${time}`);
  return (
    <span>
      {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
};

export default Time;
