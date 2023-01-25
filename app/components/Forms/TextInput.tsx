import cx from "classnames";

type Props = {
  //Insert Props Here
  className?: string;
  label: string;
  description?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
};

// Form input with label
const TextInput = ({
  className,
  label,
  description,
  name,
  defaultValue,
  placeholder,
  type = "text",
  required,
}: Props) => {
  return (
    <div className={cx(className, "flex flex-col")}>
      <label className="block font-bold text-gray-700" htmlFor={name}>
        {label}
      </label>
      {description && (
        <div className="text-sm text-gray-500 mt-1">{description}</div>
      )}

      <input
        required={required}
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={
          type !== "color" ? "px-4 py-2 border border-gray-300 rounded-md" : ""
        }
      />
    </div>
  );
};

export default TextInput;
