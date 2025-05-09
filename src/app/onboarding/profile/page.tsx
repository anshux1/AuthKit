import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { AuthHeader } from "~/components/auth/AuthHeader"
import { ProfileOnboardingForm } from "~/components/auth/OnboardingProfile"
import { auth } from "~/lib/auth"
import { getDictionary } from "~/utils/dictonaries"

export default async function page() {
  const [dictionary, session] = await Promise.all([
    getDictionary(),
    auth.api.getSession({ headers: await headers() }),
  ])
  if (!session?.user) redirect("/auth/sign-in")
  return (
    <div className="w-full max-w-sm">
      <AuthHeader title={dictionary.profile_onboarding_header} className="items-start" />
      <p className="text-muted-foreground mt-0.5 mb-4 text-sm">
        {dictionary.profile_onboarding_description}
      </p>
      <ProfileOnboardingForm
        email={session.user.email}
        name={session.user.name}
        image={session.user.image || ""}
      />
    </div>
  )
}
