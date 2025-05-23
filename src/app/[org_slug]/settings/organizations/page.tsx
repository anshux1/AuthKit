import { SettingsCardLayout } from "~/components/settings-card-layout"
import { getOrganizations } from "~/data/organization"
import { getDictionary } from "~/utils/dictonaries"
import { OrgCreateCard, OrgListMember, OrgListOwned } from "./_components"

export default async function Page({
  params,
}: {
  params: Promise<{ org_slug: string }>
}) {
  const [{ org_slug }, dictionary, organizations] = await Promise.all([
    params,
    getDictionary(),
    getOrganizations(),
  ])
  const memberOrgs = organizations?.filter((org) =>
    org.members.some((member) => member.role === "member"),
  )
  const ownerOrgs = organizations?.filter((org) =>
    org.members.some((member) => member.role === "owner"),
  )
  return (
    <>
      <SettingsCardLayout
        title={dictionary.organizations_header}
        description={dictionary.organizations_description}
      >
        <OrgCreateCard ownedOrgsCount={ownerOrgs?.length || 0} />
      </SettingsCardLayout>
      <SettingsCardLayout
        title={dictionary.my_organizations_header}
        description={dictionary.my_organizations_description}
      >
        <OrgListOwned org_slug={org_slug} organizations={ownerOrgs} />
      </SettingsCardLayout>
      <SettingsCardLayout
        title={dictionary.member_organizations_header}
        description={dictionary.member_organizations_description}
      >
        <OrgListMember org_slug={org_slug} organizations={memberOrgs} />
      </SettingsCardLayout>
    </>
  )
}
