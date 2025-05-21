import { SettingsCardLayout } from "~/components/settings-card-layout"
import { getAccountDetails } from "~/data/account"
import { getDictionary } from "~/utils/dictonaries"
import { PasswordChangeForm } from "./_components/PasswordChangeForm"
import { PasswordSetForm } from "./_components/PasswordSetForm"
import { Sessions } from "./_components/Sessions"

export default async function page() {
  const [dictionary, accountDetails] = await Promise.all([
    getDictionary(),
    getAccountDetails(),
  ])
  return (
    <>
      {accountDetails?.password ? (
        <SettingsCardLayout
          title={dictionary.change_password_header}
          description={dictionary.change_password_description}
        >
          <PasswordChangeForm />
        </SettingsCardLayout>
      ) : (
        <SettingsCardLayout
          title={dictionary.set_password_header}
          description={dictionary.set_password_description}
        >
          <PasswordSetForm />
        </SettingsCardLayout>
      )}
      <SettingsCardLayout
        title={dictionary.manage_sessions_header}
        description={dictionary.manage_sessions_description}
      >
        <Sessions />
      </SettingsCardLayout>
    </>
  )
}
