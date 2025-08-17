import { memo } from "react";
import { Input } from "../../components/ui/input";

type Props = {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "email";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const LabelInput = memo(function LabelInput({
  label,
  name,
  value,
  placeholder = "",
  required = true,
  error,
  type = "text",
  onChange,
}: Props) {
  return (
    <div>
      <label htmlFor={name} className="block text-base font-bold">
        {label}
      </label>
      <Input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
});

export default LabelInput;
