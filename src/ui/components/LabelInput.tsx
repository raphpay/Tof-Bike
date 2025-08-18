import { Eye, EyeOff } from "lucide-react";
import { memo, useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

type Props = {
  label: string;
  value: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: "text" | "email" | "password";
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
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  return (
    <div>
      <label
        htmlFor={name}
        className="block text-base font-bold"
        style={{ fontFamily: "PublicSans" }}
      >
        {label}
      </label>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          name={name}
          value={value}
          onChange={onChange}
          type={isPasswordField && !showPassword ? "password" : "text"}
          required={required}
          placeholder={placeholder}
          className={isPasswordField ? "pr-10" : ""}
        />

        {isPasswordField && (
          <Button
            type="button"
            variant="noShadow"
            size="icon"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </Button>
        )}
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
});

export default LabelInput;
