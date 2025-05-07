import type { ComponentProps } from "react"
import { UserIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"

export interface UserAvatarClassNames {
  base?: string
  image?: string
  fallback?: string
  fallbackIcon?: string
  skeleton?: string
}

export interface UserAvatarProps {
  data?: { name: string | null; image?: string }
  classNames?: UserAvatarClassNames
  isPending?: boolean
}

export function UserAvatar({
  data,
  classNames,
  className,
  isPending,
  ...props
}: UserAvatarProps & ComponentProps<typeof Avatar>) {
  const name = data?.name
  const src = data?.image

  if (isPending) {
    return (
      <Skeleton
        className={cn(
          "size-8 shrink-0 rounded-full",
          className,
          classNames?.base,
          classNames?.skeleton,
        )}
      />
    )
  }

  return (
    <Avatar className={cn("bg-muted", className, classNames?.base)} {...props}>
      <AvatarImage
        alt={name || "User image"}
        className={classNames?.image}
        src={src || undefined}
      />

      <AvatarFallback
        className={cn("uppercase", classNames?.fallback)}
        delayMs={src ? 600 : undefined}
      >
        {getInitials(name) || (
          <UserIcon className={cn("size-[50%]", classNames?.fallbackIcon)} />
        )}
      </AvatarFallback>
    </Avatar>
  )
}

const getInitials = (name?: string | null) => name?.slice(0, 2)
