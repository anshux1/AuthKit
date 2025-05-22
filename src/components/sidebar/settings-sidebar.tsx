import * as React from "react"
import Link from "next/link"
import { settingsLinks } from "~/constants/links"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar"
import { useSession } from "~/hooks/auth/useSession"
import { Skeleton } from "../ui/skeleton"

export function SettingsSidebar({ pathname, slug }: { pathname: string; slug: string }) {
  const { data, isLoading } = useSession()

  const renderMenuItems = (items: typeof settingsLinks.profile) =>
    items.map((item) => (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild isActive={pathname === item.url}>
          <Link href={`/${slug}${item.url}`}>
            <item.icon />
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    ))

  return (
    <SidebarMenu>
      {isLoading ? (
        <Skeleton className="h-4 w-3/4 rounded-sm" />
      ) : (
        <p className="text-muted-foreground mb-0.5 ml-0.5 text-xs font-medium">
          {data?.user.email}
        </p>
      )}
      {renderMenuItems(settingsLinks.profile)}
      <p className="text-muted-foreground mt-4 mb-0.5 ml-0.5 text-xs font-medium">
        Workspace settings
      </p>
      {renderMenuItems(settingsLinks.workspace)}
    </SidebarMenu>
  )
}
