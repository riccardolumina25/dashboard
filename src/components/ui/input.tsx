export function Input({ type = \"text\", value, onChange, min, max, className }) {
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={`border rounded px-3 py-2 w-full ${className}`}
      />
    );
  }
  