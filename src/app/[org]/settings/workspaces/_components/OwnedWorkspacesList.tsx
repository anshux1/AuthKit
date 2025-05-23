import { SquarePen } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { UserAvatar } from "~/components/common/Avatar"
import { LinkButton } from "~/components/link-button"
import { getDictionary } from "~/utils/dictonaries"
import { DeleteWorkspaceForm } from "./DeleteWorkspaceForm"

type MembersOrgsType = {
  id: string
  name: string
  members: { role: string }[]
  slug: string | null
  logo: string | null
  createdAt: Date
  metadata: string | null
}

export async function OwnedWorkspacesList({
  organisations,
  slug,
}: {
  organisations?: MembersOrgsType[]
  slug: string
}) {
  const dictionary = await getDictionary()
  return (
    <Card className="gap-0 py-0 shadow-none">
      {organisations?.map((org, index) => (
        <div
          key={org.id}
          className={`hover:bg-secondary/10 flex h-16 items-center justify-between px-4 ${index !== organisations.length - 1 && "border-b"} ${index === 0 ? "rounded-t-lg" : ""} ${index === organisations.length - 1 ? "rounded-b-lg" : ""}`}
        >
          <div className="flex items-center gap-2">
            <UserAvatar
              className="rounded"
              data={{ name: org.name || "", image: org?.logo || "" }}
            />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <div className="flex items-center gap-2">
                <span className="truncate text-sm font-medium">{org.name}</span>
                {slug === org.slug && (
                  <Badge variant="outline">{dictionary.current_workspace}</Badge>
                )}
              </div>
              <span className="text-muted-foreground truncate text-xs">{org.slug}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <LinkButton
              href={`/${org.slug}/settings/workspace`}
              variant="ghost"
              size="sm"
            >
              <SquarePen />
            </LinkButton>
            <DeleteWorkspaceForm workspaceId={org.id}>
              <Button variant="default" size="sm">
                Delete
              </Button>
            </DeleteWorkspaceForm>
          </div>
        </div>
      ))}
    </Card>
  )
}
