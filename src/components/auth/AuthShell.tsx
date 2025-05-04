"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Lock, WandSparkles } from "lucide-react"
import { useDictionary } from "~/store/language"
import { LinkButton } from "../link-button"
import { Button } from "../ui/button"
import { MagicLinkForm } from "./MagicLinkForm"
import { SignInForm } from "./SignInForm"
import { SignupForm } from "./SignUpForm"
import { SocialLogin } from "./SocialLogin"

export const AuthShell = () => {
  const { dictionary } = useDictionary()
  const pathname = usePathname()
  const isSignup = pathname === "/auth/sign-up"

  const [isMagicLinkActive, setIsMagicLinkActive] = useState(false)

  const toggleFormText = isMagicLinkActive
    ? `${isSignup ? dictionary.sign_up : dictionary.sign_in} ${dictionary.with_password}`
    : `${dictionary.sign_in} ${dictionary.with_magic_link}`

  return (
    <div className="-mt-2">
      <div className="text-muted-foreground mb-2 text-sm">
        {isSignup ? dictionary.already_have_account : dictionary.dont_have_account}
        <LinkButton
          className="p-0"
          variant="link"
          href={isSignup ? "/auth/sign-in" : "/auth/sign-up"}
        >
          {isSignup ? dictionary.sign_in : dictionary.sign_up}
        </LinkButton>
      </div>

      {isMagicLinkActive ? <MagicLinkForm /> : isSignup ? <SignupForm /> : <SignInForm />}

      <div className="mt-2 space-y-2">
        <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
          <span className="text-muted-foreground text-sm">
            {dictionary.or_continue_with}
          </span>
        </div>

        <Button
          onClick={() => setIsMagicLinkActive((prev) => !prev)}
          variant="outline"
          className="w-full"
        >
          {isMagicLinkActive ? (
            <Lock className="size-4" />
          ) : (
            <WandSparkles className="size-4" />
          )}
          {toggleFormText}
        </Button>
        <SocialLogin />
      </div>
    </div>
  )
}
