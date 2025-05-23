import { ArrowLeft } from "lucide-react"
import { AuthHeader } from "~/components/auth/AuthHeader"
import { ForgotPasswordForm } from "~/components/auth/ForgotPasswordForm"
import { LinkButton } from "~/components/link-button"
import { getDictionary } from "~/utils/dictonaries"

export default async function Page() {
  const dictionary = await getDictionary()
  return (
    <div className="w-full max-w-sm">
      <AuthHeader title={dictionary.forgot_password_header} className="items-start" />
      <p className="text-muted-foreground mt-0.5 mb-4 text-sm">
        {dictionary.forgot_password_description}
      </p>
      <ForgotPasswordForm />
      <LinkButton href="/auth/sign-in" variant="link" className="mt-1 -ml-2">
        <ArrowLeft /> {dictionary.back_to_sign_in}
      </LinkButton>
    </div>
  )
}
