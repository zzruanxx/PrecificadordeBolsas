import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          {
            'bg-[#3A5A40] text-white hover:bg-[#556B2F] focus:ring-[#3A5A40]': variant === 'primary',
            'bg-[#BC6C25] text-white hover:bg-[#A05A1E] focus:ring-[#BC6C25]': variant === 'secondary',
            'border-2 border-[#3A5A40] text-[#3A5A40] hover:bg-[#3A5A40] hover:text-white': variant === 'outline',
            'text-[#3A5A40] hover:bg-[#FDFBF6]': variant === 'ghost',
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
