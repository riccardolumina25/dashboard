import React from "react";

interface InputProps {
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function Input({
  type = "text",
  value,
  onChange,
  min,
  max,
  className,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={`border rounded px-3 py-2 w-full ${className || ""}`}
    />
  );
}
