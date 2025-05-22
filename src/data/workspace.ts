"use server"

import db from "~/db"
import { getSession } from "./auth"

export const getOrganizations = async () => {
  const { ctx } = await getSession()
  try {
    return await db.organization.findMany({
      where: {
        members: {
          some: {
            userId: ctx?.user.id,
          },
        },
      },
      include: {
        members: {
          where: {
            userId: ctx?.user.id,
          },
          select: {
            role: true,
          },
        },
      },
    })
  } catch {
    return null
  }
}
