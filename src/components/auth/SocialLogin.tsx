"use client"

import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { GoogleIcon, XIcon } from "~/components/provider-icon"
import { authClient } from "~/lib/auth/client"
import { useDictionary } from "~/store/language"

const PROVIDERS: {
  name: string
  id: "google" | "twitter"
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { name: "Google", id: "google", icon: GoogleIcon },
  { name: "Twitter", id: "twitter", icon: XIcon },
]

export function SocialLogin() {
  const { dictionary } = useDictionary()
  const handleAuth = async (provider: "google" | "twitter") => {
    try {
      await authClient.signIn.social(
        {
          provider,
          callbackURL: "/dashboard",
          newUserCallbackURL: "/onboarding",
        },
        {
          onError: (error) => {
            toast.error(error?.error?.message || dictionary.sign_up_error_description)
          },
        },
      )
    } catch (err) {
      const message =
        err instanceof Error ? err.message : dictionary.sign_up_error_description
      toast.error(message)
    }
  }

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {PROVIDERS.map(({ id, name, icon: Icon }) => (
          <Button
            key={id}
            variant="outline"
            className="w-full [&_svg:not([class*='size-'])]:size-4"
            onClick={() => handleAuth(id)}
          >
            <Icon />
            {name}
          </Button>
        ))}
      </div>
    </div>
  )
}
