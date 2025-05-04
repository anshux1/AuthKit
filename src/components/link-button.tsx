import React from "react"
import Link from "next/link"
import { Button } from "~/components/ui/button"

export const LinkButton = ({
  href,
  children,
  ...props
}: React.ComponentProps<typeof Link> & React.ComponentProps<typeof Button>) => {
  return (
    <Button asChild {...props}>
      <Link href={href}>{children}</Link>
    </Button>
  )
}
