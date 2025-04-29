import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 font-semibold bg-blue-400 hover:bg-blue-500 text-white ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}
