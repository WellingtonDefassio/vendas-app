import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  columnSize?: string;
  typeDiv?: string;
  initialValue: string;
  onChange?: (value: any) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  columnSize,
  typeDiv,
  initialValue,
  onChange,
  ...props
}: InputProps) => {
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
            onChange={(event) => {
              if (onChange) {
                onChange(event.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};
