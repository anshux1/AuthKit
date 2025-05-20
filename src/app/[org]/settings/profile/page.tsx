import React from "react"
import { redirect } from "next/navigation"
import { SettingsCardLayout } from "~/components/settings-card-layout"
import { getSession } from "~/data/auth"
import { getDictionary } from "~/utils/dictonaries"
import { PersonalDetails } from "./_components/PersonalDetails"
import { Preferences } from "./_components/Preferences"

export default async function page() {
  const [dictionary, session] = await Promise.all([getDictionary(), getSession()])
  if (!session.ctx?.user) redirect("/login")
  return (
    <>
      <SettingsCardLayout
        title={dictionary.personal_details_header}
        description={dictionary.personal_details_description}
      >
        <PersonalDetails
          name={session.ctx.user.name}
          email={session.ctx.user.email}
          image={session.ctx.user.image || ""}
        />
      </SettingsCardLayout>
      <SettingsCardLayout
        title={dictionary.preferences_header}
        description={dictionary.preferences_description}
      >
        <Preferences />
      </SettingsCardLayout>
    </>
  )
}
