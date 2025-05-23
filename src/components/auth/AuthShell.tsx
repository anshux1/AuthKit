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
    <div className="-mt-2 space-y-2">
      <div className="text-muted-foreground mb-2 text-sm">
        {isSignup ? dictionary.already_have_account : dictionary.dont_have_account}{" "}
        <LinkButton
          className="p-0"
          variant="link"
          href={isSignup ? "/auth/sign-in" : "/auth/sign-up"}
        >
          {isSignup ? dictionary.sign_in : dictionary.sign_up}
        </LinkButton>
      </div>

      {isMagicLinkActive ? <MagicLinkForm /> : isSignup ? <SignupForm /> : <SignInForm />}
      <div className="relative my-1.5">
        <div className="absolute inset-0 flex items-center">
          <span className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="text-muted-foreground bg-background px-2 text-xs">
            {dictionary.or_continue_with}
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setIsMagicLinkActive(!isMagicLinkActive)} // Simplified toggle
      >
        {isMagicLinkActive ? (
          <Lock className="mr-2 size-4" /> // Added mr-2
        ) : (
          <WandSparkles className="mr-2 size-4" /> // Added mr-2
        )}
        {toggleFormText}
      </Button>
      <SocialLogin />
    </div>
  )
}
