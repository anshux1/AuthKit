"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronLeft,
  Cog,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Plus,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "~/components/ui/sidebar"
import { NavMain } from "~/components/sidebar/nav-main"
import { NavProjects } from "~/components/sidebar/nav-projects"
import { NavUser } from "~/components/sidebar/nav-user"
import { WorkspaceSwitcher } from "~/components/sidebar/workspace-switcher"
import { LinkButton } from "../link-button"
import { Separator } from "../ui/separator"
import { NavSecondary } from "./nav-secondary"
import { SettingsSidebar } from "./settings-sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Integrations",
      url: "/integrations",
      icon: Plus,
    },
    {
      title: "Settings",
      url: "/settings/profile",
      icon: Cog,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  slug,
  ...props
}: React.ComponentProps<typeof Sidebar> & { slug: string }) {
  const pathname = usePathname()
  const isSettingsPage = pathname.includes("/settings")
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <Separator />
      {isSettingsPage ? (
        <SidebarContent className="p-3">
          <div className="flex items-center gap-1">
            <LinkButton
              href={`/${slug}/dashboard`}
              className="w-full justify-start px-3 [&_svg]:size-10"
              variant="ghost"
              size="icon"
              asChild
            >
              <ChevronLeft />
              <span className="text-[1rem]">Back to dashboard</span>
            </LinkButton>
          </div>
          <SettingsSidebar slug={slug} pathname={pathname} />
        </SidebarContent>
      ) : (
        <SidebarContent>
          <NavMain items={data.navMain} />
          <NavProjects projects={data.projects} />
          <NavSecondary slug={slug} items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
      )}
      {!isSettingsPage && (
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
