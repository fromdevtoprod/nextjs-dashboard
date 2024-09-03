export function TimeField({
  value,
  onChange,
}: {
  value?: string;
  onChange?: (time: string) => void;
}) {
  return (
    <input
      id="time"
      name="time"
      type="time"
      className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
      aria-describedby="time-error"
      onChange={(e) => onChange && onChange(e.target.value)}
      value={value}
    />
  );
}
