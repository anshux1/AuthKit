import * as React from "react"
import Link from "next/link"
import { settignsLinks } from "~/constants/links"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "~/components/ui/sidebar"

export function SettingsSidebar({ pathname, slug }: { pathname: string; slug: string }) {
  console.log(slug)
  return (
    <SidebarMenu>
      {settignsLinks.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={pathname === item.url}>
            <Link href={`/${slug}${item.url}`}>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
