import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative flex items-start gap-3 rounded-xl border p-4",
  {
    variants: {
      variant: {
        warning: "bg-amber-50  border-amber-200 text-amber-800",
        info:    "bg-blue-50   border-blue-200  text-blue-800",
        success: "bg-green-50  border-green-200 text-green-800",
        danger:  "bg-red-50    border-red-200   text-red-800",
      },
    },
    defaultVariants: { variant: "info" },
  }
)

const Alert = React.forwardRef(({ className, variant, icon, children, ...props }, ref) => (
  <div ref={ref} className={cn(alertVariants({ variant }), className)} {...props}>
    {icon && <span className="text-base shrink-0 mt-0.5">{icon}</span>}
    <span className="text-sm leading-relaxed">{children}</span>
  </div>
))
Alert.displayName = "Alert"

export { Alert }
