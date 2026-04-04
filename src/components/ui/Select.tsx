import { type SelectHTMLAttributes, forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[]
  placeholder?: string
  error?: boolean
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, placeholder = 'Selecione...', error, className = '', ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-3 pr-10 rounded-xl border text-sm text-gray-900 bg-white appearance-none
            transition-all duration-200 cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-[#7E46EA] focus:border-transparent
            disabled:bg-gray-50 disabled:cursor-not-allowed
            ${error
              ? 'border-red-400 bg-red-50 focus:ring-red-400'
              : 'border-gray-200 hover:border-gray-300'
            }
            ${className}
          `}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    )
  }
)

Select.displayName = 'Select'
