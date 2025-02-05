import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "border border-gray-300 rounded-md bg-white text-gray-900",
        "hover:border-gray-400 transition-colors duration-200",
        "shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...rest }: Props) {
  return (
    <div className={cn("px-4 py-2", className)} {...rest}>
      {children}
    </div>
  );
}
