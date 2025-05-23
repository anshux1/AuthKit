import {
  BellIcon,
  Building2Icon,
  BuildingIcon,
  CreditCardIcon,
  LockKeyholeIcon,
  UserIcon,
} from "lucide-react"

export const settingsLinks = {
  profile: [
    {
      title: "Profile",
      url: "/settings/profile",
      icon: UserIcon,
    },
    {
      title: "Security",
      url: "/settings/security",
      icon: LockKeyholeIcon,
    },
    {
      title: "Notifications",
      url: "/settings/notifications",
      icon: BellIcon,
    },
    {
      title: "Organizations",
      url: "/settings/organizations",
      icon: Building2Icon,
    },
    {
      title: "Billing",
      url: "/settings/billing",
      icon: CreditCardIcon,
    },
  ],
  organization: [
    {
      title: "Organization",
      url: "/settings/organization",
      icon: BuildingIcon,
    },
    {
      title: "Members",
      url: "/settings/members",
      icon: UserIcon,
    },
  ],
}
