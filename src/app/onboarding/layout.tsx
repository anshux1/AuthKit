import { ArrowLeft } from "lucide-react"
import { LinkButton } from "~/components/link-button"
import { getDictionary } from "~/utils/dictonaries"

export default async function layout({ children }: { children: React.ReactNode }) {
  const dictionary = await getDictionary()
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <LinkButton href="/" variant="link" className="absolute top-4 left-4">
        <ArrowLeft /> {dictionary.back_to_home}
      </LinkButton>
      {children}
    </div>
  )
}
