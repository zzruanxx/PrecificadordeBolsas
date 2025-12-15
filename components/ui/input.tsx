import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border-2 border-[#e5e7eb] bg-white px-4 py-2 text-sm text-[#333333] placeholder:text-[#999999] transition-all duration-200 hover:border-[#d1d5db] focus:outline-none focus:ring-2 focus:ring-[#BC6C25] focus:border-[#BC6C25] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#f9fafb]",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
