import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  error?: boolean | string;
}

export function Label({ className, children, error, ...props }: LabelProps) {
  return (
    <label className={cn("mb-1 block text-sm", error ? "text-red-500" : "text-gray-600", className)} {...props}>
      {children}
    </label>
  )
}