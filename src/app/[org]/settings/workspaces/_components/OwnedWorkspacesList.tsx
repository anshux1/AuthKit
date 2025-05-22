import { SquarePen } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card } from "~/components/ui/card"
import { UserAvatar } from "~/components/common/Avatar"
import { LinkButton } from "~/components/link-button"

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
}: {
  organisations?: MembersOrgsType[]
}) {
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
              <span className="truncate font-medium">{org.name}</span>
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
            <Button variant="default" size="sm">
              Delete
            </Button>
          </div>
        </div>
      ))}
    </Card>
  )
}
