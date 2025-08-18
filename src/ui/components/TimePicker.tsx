import { Input } from "../../components/ui/input";

interface Props {
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const TimePicker = ({ value, onChange }: Props) => {
  return (
    <Input
      name="startTime"
      type="time"
      id="time-picker"
      step="1"
      defaultValue="10:30"
      value={value}
      onChange={onChange}
      className="bg-background w-full max-w-sm appearance-none border-[1.5px] border-black [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
      required
    />
  );
};

export default TimePicker;
