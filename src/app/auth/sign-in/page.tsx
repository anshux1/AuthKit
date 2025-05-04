import { AuthHeader } from "~/components/auth/AuthHeader"
import { AuthShell } from "~/components/auth/AuthShell"
import { getDictionary } from "~/utils/dictonaries"

export default async function page() {
  const dictionary = await getDictionary()
  return (
    <div className="w-full max-w-sm">
      <AuthHeader title={dictionary.sign_in_header} className="items-start" />
      <AuthShell />
    </div>
  )
}
