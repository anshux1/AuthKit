import {
  Bell,
  BriefcaseBusiness,
  Building,
  CreditCard,
  LockKeyhole,
  User,
} from "lucide-react"

export const settingsLinks = {
  profile: [
    {
      title: "Profile",
      url: "/settings/profile",
      icon: User,
    },
    {
      title: "Security",
      url: "/settings/security",
      icon: LockKeyhole,
    },
    {
      title: "Notifications",
      url: "/settings/notifications",
      icon: Bell,
    },
    {
      title: "Workspaces",
      url: "/settings/workspaces",
      icon: BriefcaseBusiness,
    },
    {
      title: "Billing",
      url: "/settings/billing",
      icon: CreditCard,
    },
  ],
  workspace: [
    {
      title: "Workspace",
      url: "/settings/workspace",
      icon: Building,
    },
    {
      title: "Members",
      url: "/settings/members",
      icon: User,
    },
  ],
}
