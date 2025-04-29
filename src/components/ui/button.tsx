export function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 font-semibold bg-blue-400 hover:bg-blue-500 text-white ${className}`}
    >
      {children}
    </button>
  );
}
