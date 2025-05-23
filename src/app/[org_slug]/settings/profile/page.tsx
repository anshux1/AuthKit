import React from "react"
import { redirect } from "next/navigation"
import { SettingsCardLayout } from "~/components/settings-card-layout"
import { getSession } from "~/data/auth"
import { getDictionary } from "~/utils/dictonaries"
import { UserDeleteCard, UserDetails, UserPreferences } from "./_components"

export default async function page() {
  const [dictionary, session] = await Promise.all([getDictionary(), getSession()])
  if (!session.ctx?.user) redirect("/login")
  return (
    <>
      <SettingsCardLayout
        title={dictionary.personal_details_header}
        description={dictionary.personal_details_description}
      >
        <UserDetails
          name={session.ctx.user.name}
          email={session.ctx.user.email}
          image={session.ctx.user.image || ""}
        />
      </SettingsCardLayout>
      <SettingsCardLayout
        title={dictionary.preferences_header}
        description={dictionary.preferences_description}
      >
        <UserPreferences />
      </SettingsCardLayout>
      <SettingsCardLayout
        title={dictionary.delete_account_header}
        description={dictionary.delete_account_description}
      >
        <UserDeleteCard />
      </SettingsCardLayout>
    </>
  )
}
