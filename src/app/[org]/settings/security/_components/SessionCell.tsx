"use client"

import { usePathname, useRouter } from "next/navigation"
import { revokeSession } from "~/action/auth/session"
import type { Session } from "better-auth"
import { LaptopIcon, Loader2, SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"
import { UAParser } from "ua-parser-js"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { Skeleton } from "~/components/ui/skeleton"
import { useSession } from "~/hooks/auth/useSession"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export interface SessionCellProps {
  session: Session
}

export function SessionCell({ session }: SessionCellProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: sessionData } = useSession()
  const { dictionary } = useDictionary()
  const isCurrentSession = session.id === sessionData?.session?.id

  const { execute, isLoading } = useAction(revokeSession, {
    onSuccess: (data) => {
      toast(data)
      if (isCurrentSession) {
        router.push("/sign-in")
      }
    },
    onError: (error) => toast.error(error),
  })

  const handleRevoke = async (token: string) => execute({ token, pathname })

  const parser = UAParser(session.userAgent as string)
  const isMobile = parser.device.type === "mobile"

  return (
    <Card className="flex-row items-center gap-3 px-4 py-3">
      {isMobile ? (
        <SmartphoneIcon className="size-4" />
      ) : (
        <LaptopIcon className="size-4" />
      )}

      <div className="flex flex-col">
        <span className="text-sm font-semibold">
          {isCurrentSession ? dictionary.current_session : session?.ipAddress}
        </span>
        <span className="text-muted-foreground text-xs">
          {parser.os.name}, {parser.browser.name}
        </span>
      </div>

      <Button
        className="relative ms-auto"
        disabled={isLoading}
        size="sm"
        variant="outline"
        onClick={() => handleRevoke(session.token)}
      >
        {isLoading && <Loader2 className="animate-spin" />}
        {isCurrentSession ? dictionary.sign_out : dictionary.revoke}
      </Button>
    </Card>
  )
}

export function SettingsCellSkeleton() {
  return (
    <Card className="flex-row p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 rounded-full" />
        <div>
          <Skeleton className="h-4 w-24" />
          <Skeleton className="mt-1 h-3 w-36" />
        </div>
      </div>
      <Skeleton className="ms-auto size-9" />
    </Card>
  )
}
