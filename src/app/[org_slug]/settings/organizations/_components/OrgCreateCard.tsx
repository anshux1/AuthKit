import { Card } from "~/components/ui/card"
import { LinkButton } from "~/components/link-button"
import { getDictionary } from "~/utils/dictonaries"

export async function OrgCreateCard({ ownedOrgsCount }: { ownedOrgsCount: number }) {
  const dictionary = await getDictionary()
  return (
    <Card className="flex flex-row items-center justify-between p-4 shadow-none">
      <p className="text-muted-foreground text-sm">
        You have {ownedOrgsCount} of 6 organizations available in your plan
      </p>
      <LinkButton href="/join" size="sm">
        {dictionary.create_organization}
      </LinkButton>
    </Card>
  )
}
