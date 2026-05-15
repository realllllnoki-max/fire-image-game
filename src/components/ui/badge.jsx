import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors",
  {
    variants: {
      variant: {
        default:  "bg-orange-100 text-orange-700",
        outline:  "border border-slate-200 text-slate-600",
        teal:     "bg-teal-100 text-teal-700",
        blue:     "bg-blue-100 text-blue-700",
        red:      "bg-red-100 text-red-700",
        purple:   "bg-purple-100 text-purple-700",
        green:    "bg-green-100 text-green-700",
        yellow:   "bg-yellow-100 text-yellow-700",
        slate:    "bg-slate-100 text-slate-600",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

const Badge = React.forwardRef(({ className, variant, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
))
Badge.displayName = "Badge"

export { Badge, badgeVariants }
