"use server"

import { headers } from "next/headers"
import db from "~/db"
import { auth } from "~/lib/auth"

export const getAccountDetails = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return await db.account.findFirst({
    where: { userId: session?.user.id, providerId: "credential" },
    select: {
      password: true,
    },
  })
}
