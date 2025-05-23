import { AuthHeader } from "~/components/auth/AuthHeader"
import { SetPasswordForm } from "~/components/auth/SetPasswordForm"
import { getDictionary } from "~/utils/dictonaries"

export default async function Page(props: { searchParams: Promise<{ token: string }> }) {
  const [{ token }, dictionary] = await Promise.all([props.searchParams, getDictionary()])
  return (
    <div className="w-full max-w-sm">
      {!token ? (
        <div className="flex flex-col items-center gap-2">
          <h1 className="mt-2 text-center text-xl font-bold sm:text-2xl">
            {dictionary.no_token}
          </h1>
        </div>
      ) : (
        <>
          <AuthHeader title={dictionary.set_password_header} className="items-start" />
          <p className="text-muted-foreground mt-0.5 mb-4 text-sm">
            {dictionary.set_password_description}
          </p>
          <SetPasswordForm reset token={token} />
        </>
      )}
    </div>
  )
}
