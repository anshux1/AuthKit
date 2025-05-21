"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Organization } from "better-auth/plugins"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"

export const Breadcrumbs = ({
  slug,
  organizations,
}: {
  slug: string
  organizations: Organization[]
}) => {
  const pathname = usePathname()
  const pathArray = pathname.split("/").filter((path) => path && path !== "app")

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1 focus:ring-0 focus:outline-none">
              {slug.charAt(0).toUpperCase() + slug.slice(1)}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="">
              {organizations.map((org) => {
                const link = `/${org.slug}/${pathArray.slice(1).join("/")}`
                return (
                  <DropdownMenuItem
                    asChild
                    className={slug === org.slug ? "bg-secondary" : undefined}
                    key={org.id}
                  >
                    <Link href={link}>{org.name}</Link>
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        {pathArray.slice(1).map((path, index) => {
          const formattedPath = path
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
          const href = `/${pathArray.slice(0, index + 2).join("/")}`
          const isLast = index === pathArray.length - 2

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{formattedPath}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
