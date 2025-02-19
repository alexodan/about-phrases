import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = PropsWithChildren<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "solid" | "outline";
  }
>;

export function Button({
  children,
  variant = "solid",
  className,
  ...rest
}: Props) {
  const baseStyles = "p-2 rounded-md cursor-pointer";
  const variantStyles =
    variant === "outline"
      ? "border-2 border-blue-500 text-blue-500 hover:bg-blue-50"
      : "bg-blue-500 text-white hover:bg-blue-600";

  return (
    <button className={cn(baseStyles, variantStyles, className)} {...rest}>
      {children}
    </button>
  );
}
