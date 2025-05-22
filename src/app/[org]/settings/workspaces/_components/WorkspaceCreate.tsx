import { Card } from "~/components/ui/card"
import { LinkButton } from "~/components/link-button"
import { getDictionary } from "~/utils/dictonaries"

export default async function WorkspaceCreate({
  ownedOrgsCount,
}: {
  ownedOrgsCount: number
}) {
  const dictionary = await getDictionary()
  return (
    <Card className="flex flex-row items-center justify-between px-4 py-3 shadow-none">
      <p className="text-sm">
        You have {ownedOrgsCount} of 6 workspaces available in your plan
      </p>
      <LinkButton href="/join" size="sm">
        {dictionary.create_workspace}
      </LinkButton>
    </Card>
  )
}
