export function Input({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`
        w-full px-4 py-2
        border border-gray-300 rounded-md
        bg-white text-gray-900
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        hover:border-gray-400
        transition-colors duration-200
        placeholder:text-gray-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className || ""}
      `}
      {...rest}
    />
  );
}
