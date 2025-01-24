import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<Omit<HTMLInputElement, "prefix">> {
  prefix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, prefix, type, ...props }, ref) => {
    return (
      <div className="flex flex-row items-center">
        {prefix && (
          <span className="h-10 p-2 text-sm border-l border-solid rounded-l-md border-y border-input">
            {prefix}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            prefix ? "rounded-l-none" : "",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
