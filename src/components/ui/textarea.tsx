import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
}

export function TextArea({ className, error, ...props }: TextAreaProps) {
  return (
    <div>
      <textarea className={cn("w-full rounded-md border px-3 py-2 text-sm", error ? "border-red-500" : "border-gray-200", className)} {...props} />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}