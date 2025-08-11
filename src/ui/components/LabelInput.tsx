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
      <label htmlFor={name} className="block text-base font-medium">
        {label}
      </label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        required={required}
        className="w-full rounded-lg border border-gray-300 p-3 text-base focus:ring focus:ring-blue-300 focus:outline-none"
        placeholder={placeholder}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
