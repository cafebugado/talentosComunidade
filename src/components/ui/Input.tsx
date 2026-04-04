import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className = '', ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`
          w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-white
          placeholder:text-gray-400 transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#7E46EA] focus:border-transparent
          disabled:bg-gray-50 disabled:cursor-not-allowed
          ${error
            ? 'border-red-400 bg-red-50 focus:ring-red-400'
            : 'border-gray-200 hover:border-gray-300'
          }
          ${className}
        `}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
