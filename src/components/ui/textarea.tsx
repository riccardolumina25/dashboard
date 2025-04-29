export function Textarea({ value, onChange, maxLength, placeholder, className }) {
    return (
      <textarea
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`border rounded px-3 py-2 w-full ${className}`}
        rows={3}
      />
    );
  }
  