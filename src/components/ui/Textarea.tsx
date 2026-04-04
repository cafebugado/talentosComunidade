import { type TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  currentLength?: number
  maxLength?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error, currentLength, maxLength, className = '', ...props }, ref) => {
    const isNearLimit = maxLength && currentLength !== undefined && currentLength > maxLength * 0.85

    return (
      <div className="flex flex-col gap-1">
        <textarea
          ref={ref}
          className={`
            w-full px-4 py-3 rounded-xl border text-sm text-gray-900 bg-white
            placeholder:text-gray-400 transition-all duration-200 resize-none
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
        {maxLength !== undefined && currentLength !== undefined && (
          <p
            className={`text-xs text-right ${
              currentLength > maxLength
                ? 'text-red-500'
                : isNearLimit
                ? 'text-amber-500'
                : 'text-gray-400'
            }`}
          >
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
