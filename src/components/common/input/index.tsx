import { InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  columnSize?: string;
  typeDiv?: string;
  initialValue?: string | number;
  onChange?: (value: any) => void;
  currency?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  columnSize,
  typeDiv,
  initialValue,
  onChange,
  currency,
  ...props
}: InputProps) => {
  const onInputChange = (event: any) => {
    let value = event.target.value;
    if (value && currency) {
      value = formatReal(value);
    }
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className={`column ${columnSize}`}>
      <div className="field">
        <label className="label" htmlFor={id}>
          {label}
        </label>
        <div className="control">
          <input
            className={typeDiv}
            type="text"
            id={id}
            {...props}
            value={initialValue}
            onChange={onInputChange}
          />
        </div>
      </div>
    </div>
  );
};
