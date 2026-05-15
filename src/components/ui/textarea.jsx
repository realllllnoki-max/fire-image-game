import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3",
      "text-sm text-slate-900 leading-relaxed font-[var(--font-sans)]",
      "placeholder:text-slate-400 resize-vertical",
      "transition-all duration-200",
      "focus:outline-none focus:border-orange-400 focus:bg-white focus:ring-3 focus:ring-orange-500/10",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      className
    )}
    {...props}
  />
))
Textarea.displayName = "Textarea"

export { Textarea }
