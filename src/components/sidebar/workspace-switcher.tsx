"use client"

import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"
import { Skeleton } from "~/components/ui/skeleton"
import { UserAvatar } from "~/components/common/Avatar"
import { authClient } from "~/lib/auth/client"

export function WorkspaceSwitcher() {
  const { isMobile } = useSidebar()
  const { isPending, data } = authClient.useListOrganizations()
  console.log(data)

  if (isPending) {
    return <Skeleton className="h-12"></Skeleton>
  }
  const activeTeam = data?.at(0)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar
                className="rounded-lg"
                data={{ name: activeTeam?.name || "", image: activeTeam?.logo || "" }}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam?.name}</span>
                <span className="truncate text-xs">{activeTeam?.slug}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {data?.map((team) => (
              <DropdownMenuItem key={team.slug} className="gap-2 p-2">
                <UserAvatar
                  className="size-8 rounded-sm"
                  data={{ name: team.name || "", image: team?.logo || "" }}
                />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <div className="text-sm font-medium">{team.name}</div>
                  <div className="text-muted-foreground text-xs">{team.slug}</div>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
