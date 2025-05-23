import { Badge } from "~/components/ui/badge"
import { Card } from "~/components/ui/card"
import { UserAvatar } from "~/components/common/Avatar"
import { getDictionary } from "~/utils/dictonaries"

interface OrgListMemberProps {
  organizations?: {
    id: string
    name: string
    members: { role: string }[]
    slug: string | null
    logo: string | null
    createdAt: Date
    metadata: string | null
  }[]
  org_slug: string
}
export async function OrgListMember({ organizations, org_slug }: OrgListMemberProps) {
  const dictionary = await getDictionary()
  return (
    <Card className="gap-0 p-4 shadow-none">
      {organizations?.length ? (
        organizations?.map((org, index) => (
          <div
            key={org.id}
            role="listitem"
            className={`hover:bg-secondary/10 flex h-16 items-center justify-between px-4 ${index !== organizations.length - 1 && "border-b"} ${index === 0 ? "rounded-t-lg" : ""} ${index === organizations.length - 1 ? "rounded-b-lg" : ""}`}
          >
            <div className="flex items-center gap-2">
              <UserAvatar
                className="rounded"
                data={{ name: org.name || "", image: org?.logo || "" }}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="flex items-center gap-2">
                  <span className="truncate text-sm font-medium">{org.name}</span>
                  {org_slug === org.slug && (
                    <Badge variant="outline">{dictionary.current_organization}</Badge>
                  )}
                </div>
                <span className="text-muted-foreground truncate text-xs">{org.slug}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-muted-foreground text-sm">
          {dictionary.not_a_member_of_any_organization}
        </div>
      )}
    </Card>
  )
}
