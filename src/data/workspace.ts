"use server"

import { headers } from "next/headers"
import { auth } from "~/lib/auth"

export const getOrganizations = async () => {
  try {
    return await auth.api.listOrganizations({ headers: await headers() })
  } catch {
    return null
  }
}
