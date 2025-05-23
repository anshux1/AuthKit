import { ReactNode } from "react"

export interface LayoutPageProps {
  children: ReactNode
}

export type OrgParam = Promise<{ org_slug: string }>
