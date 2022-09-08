import { InputHTMLAttributes } from "react";
import { formatReal } from "app/util/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  columnSize?: string;
  typeDiv?: string;
  initialValue?: string | number;
  currency?: boolean;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  columnSize,
  typeDiv,
  initialValue,
  currency,
  error,
  ...props
}: InputProps) => {
  const onInputChange = (event: any) => {
    let value = event.target.value;
    if (value && currency) {
      value = formatReal(value);
    }
  };

  return (
    <div className={`column ${columnSize}`}>
      <div className="field">
        <label className="label" htmlFor={id}>
          {label}
        </label>
        <div className="control">
          <input className={typeDiv} type="text" id={id} {...props} />
          {error && <p className="help is-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
};
