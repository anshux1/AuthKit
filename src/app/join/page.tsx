import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { OrganizationCreateForm } from "~/components/auth/OnboardingOrganization"
import { LinkButton } from "~/components/link-button"
import { auth } from "~/lib/auth"
import { getDictionary } from "~/utils/dictonaries"

export default async function page() {
  const [dictionary, session] = await Promise.all([
    getDictionary(),
    auth.api.getSession({ headers: await headers() }),
  ])
  if (!session?.user) redirect("/auth/sign-in")
  return (
    <div className="relative flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <LinkButton href="/" variant="link" className="absolute top-4 left-4">
        <ArrowLeft /> {dictionary.back_to_dashboard}
      </LinkButton>
      <div className="w-full max-w-sm">
        <h1 className="mt-2 text-xl font-bold sm:text-2xl">
          {dictionary.create_new_organization}
        </h1>
        <p className="text-muted-foreground mt-0.5 mb-4 text-sm">
          {dictionary.organization_onboarding_description}
        </p>
        <OrganizationCreateForm />
      </div>
    </div>
  )
}
