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
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none shadow-sm active:scale-95",
          {
            'bg-[#3A5A40] text-white hover:bg-[#2d4732] hover:shadow-md focus:ring-[#3A5A40]': variant === 'primary',
            'bg-[#BC6C25] text-white hover:bg-[#A05A1E] hover:shadow-md focus:ring-[#BC6C25]': variant === 'secondary',
            'border-2 border-[#3A5A40] bg-transparent text-[#3A5A40] hover:bg-[#3A5A40] hover:text-white hover:shadow-md': variant === 'outline',
            'text-[#3A5A40] hover:bg-[#f5f3ed] hover:shadow-sm': variant === 'ghost',
            'px-3 py-1.5 text-sm min-h-[32px]': size === 'sm',
            'px-4 py-2.5 text-base min-h-[40px]': size === 'md',
            'px-6 py-3 text-lg min-h-[48px]': size === 'lg',
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
