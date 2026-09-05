import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, type = "button", ...props }: ButtonProps) {
  const variants = {
    primary: "bg-gray-700 text-white hover:bg-gray-800",
    secondary: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
    tertiary: "text-gray-500 hover:text-gray-900"
  }

  return (
    <button type={type} className={cn("cursor-pointer rounded-md px-3 py-2 text-sm transition-all", variants[variant], className)} {...props}>
      { children }
    </button>
  )
}