import { cn } from "@/lib/utils"

function Logo({ className }: { className?: string }) {
  return (
    <img
      src="/logo.svg"
      alt="Logo"
      className={cn(
        "w-full h-auto transition-colors duration-300",
        className
      )}
      role="img"
      aria-label="Logo"
    />
  )
}

export default Logo
