import { PropsWithChildren } from "react";

type Props = PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline";
  }
>;

export function Button({ children, variant = "solid", ...rest }: Props) {
  const baseStyles = "p-2 rounded-md cursor-pointer";
  const variantStyles =
    variant === "outline"
      ? "border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={`${baseStyles} ${variantStyles}`} {...rest}>
      {children}
    </button>
  );
}
