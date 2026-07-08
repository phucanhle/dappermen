export function Field({
  label,
  type = "text",
  value ="",
  onChange,
  placeholder = "",
  className = "",
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  const inputId = `field-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor={inputId} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <input
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-2 border border-gray-300 rounded"
      />
    </div>
  );
}

export function FieldSelect({
  label,
  options,
  value,
  onChange,
  className = "",
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}) {
  const selectId = `select-${label.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  return (
    <div className={`flex flex-col mb-4 ${className}`}>
      <label htmlFor={selectId} className="mb-1 text-sm font-medium text-gray-700">{label}</label>
      <select
        id={selectId}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}