import { Separator } from "~/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar"
import { Breadcrumbs } from "~/components/Breadcrumbs"
import { AppSidebar } from "~/components/sidebar/app-sidebar"
import { getOrganizations } from "~/data/organization"
import { LayoutPageProps, OrgParam } from "~/types/ui"

interface SidebarLayoutProps extends LayoutPageProps {
  params: OrgParam
}
export default async function Layout({ params, children }: SidebarLayoutProps) {
  const [{ org_slug }, organizations] = await Promise.all([params, getOrganizations()])
  return (
    <SidebarProvider>
      <AppSidebar org_slug={org_slug} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            {organizations?.length && (
              <Breadcrumbs org_slug={org_slug} organizations={organizations} />
            )}
          </div>
        </header>
        <Separator />
        <div className="mx-auto flex w-full flex-1 flex-col gap-4 p-4 lg:px-8 lg:py-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
