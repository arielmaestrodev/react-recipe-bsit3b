import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  className?: string;
}

export function Tag({ children, className }: TagProps) {
  return (
    <span className={cn("rounded bg-gray-100 px-2 py-0.5 text-sm text-gray-600", className)}>
      {children}
    </span>
  )
}