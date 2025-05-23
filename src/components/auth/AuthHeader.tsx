import { cn } from "~/lib/utils"
import { getDictionary } from "~/utils/dictonaries"
import { Logo } from "../logo"

interface AuthHeaderProps {
  title: string
  className?: string
}

export async function AuthHeader({ title, className }: AuthHeaderProps) {
  const { app_name } = await getDictionary()
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div className="flex font-medium">
        <Logo />
        <span className="sr-only">{app_name}</span>
      </div>
      <h1 className="mt-2 text-center text-xl font-bold sm:text-2xl">{title}</h1>
    </div>
  )
}
