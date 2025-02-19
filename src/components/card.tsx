import { PropsWithChildren } from "react";
import { cn } from "../lib/utils";

type Props = PropsWithChildren<React.HTMLAttributes<HTMLDivElement>>;

export function Card({ children, className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "border border-blue-500 rounded-md bg-white text-gray-900",
        "hover:border-blue-600 transition-colors duration-200",
        "shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
