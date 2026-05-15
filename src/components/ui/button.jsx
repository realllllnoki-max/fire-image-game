import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer disabled:pointer-events-none disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        default:  "bg-orange-500 text-white shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40",
        outline:  "border-2 border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:border-slate-300",
        ghost:    "text-slate-600 hover:bg-slate-100",
        danger:   "bg-red-500 text-white shadow-lg shadow-red-500/25 hover:bg-red-600",
        teal:     "bg-teal-500 text-white shadow-lg shadow-teal-500/25 hover:bg-teal-600",
        blue:     "bg-blue-500 text-white shadow-lg shadow-blue-500/25 hover:bg-blue-600",
        purple:   "bg-purple-500 text-white shadow-lg shadow-purple-500/25 hover:bg-purple-600",
        rose:     "bg-rose-500 text-white shadow-lg shadow-rose-500/25 hover:bg-rose-600",
        success:  "bg-green-500 text-white shadow-lg shadow-green-500/25 hover:bg-green-600",
      },
      size: {
        sm:  "h-8 px-4 text-xs",
        md:  "h-10 px-5 text-sm",
        lg:  "h-12 px-8 text-base",
        xl:  "h-14 px-10 text-base",
        icon:"h-9 w-9",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
