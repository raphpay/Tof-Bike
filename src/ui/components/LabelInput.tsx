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

export default function LabelInput({
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
      <label className="block text-sm font-medium">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className="w-full rounded-md border p-2"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
