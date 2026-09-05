import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex item-stretch justify-center bg-black/40 lg:items-center lg:p-4" onClick={onClose}>
      <div className="flex h-full w-full flex-col bg-white lg:h-auto lg:max-h-[90vh] lg:max-w-2xl lg:rounded-md lg:border lg:border-gray-200" onClick={(e) => e.stopPropagation()}>
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-lg font-medium">{title}</h2>
          <Button variant="tertiary" onClick={onClose}>
            Close
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div> 
  )
}