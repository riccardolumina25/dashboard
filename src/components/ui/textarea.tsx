import React from "react";

interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  placeholder?: string;
  className?: string;
}

export function Textarea({
  value,
  onChange,
  maxLength,
  placeholder,
  className,
}: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      maxLength={maxLength}
      placeholder={placeholder}
      className={`${className || ""}`}
      rows={3}
    />
  );
}
