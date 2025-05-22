import { SettingsCardLayout } from "~/components/settings-card-layout"
import { getOrganizations } from "~/data/workspace"
import { getDictionary } from "~/utils/dictonaries"
import { OwnedWorkspacesList } from "./_components/OwnedWorkspacesList"
import WorkspaceCreate from "./_components/WorkspaceCreate"

export default async function page() {
  const [dictionary, organisations] = await Promise.all([
    getDictionary(),
    getOrganizations(),
  ])
  const memberOrgs = organisations?.filter((org) =>
    org.members.some((member) => member.role === "member"),
  )
  const ownerOrgs = organisations?.filter((org) =>
    org.members.some((member) => member.role === "owner"),
  )
  return (
    <>
      <SettingsCardLayout
        title={dictionary.workspaces_header}
        description={dictionary.workspaces_description}
      >
        <WorkspaceCreate ownedOrgsCount={ownerOrgs?.length || 0} />
      </SettingsCardLayout>
      <SettingsCardLayout
        title={dictionary.my_workspaces_header}
        description={dictionary.my_workspaces_description}
      >
        <OwnedWorkspacesList organisations={ownerOrgs} />
      </SettingsCardLayout>
      <SettingsCardLayout
        title={dictionary.member_workspaces_header}
        description={dictionary.member_workspaces_description}
      >
        <OwnedWorkspacesList organisations={memberOrgs} />
      </SettingsCardLayout>
    </>
  )
}
