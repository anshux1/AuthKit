"use server"

import db from "~/db"
import { InputTypeMarkUserEmailVerified, ReturnTypeMarkUserEmailVerified } from "./types"

export const markEmailasVerified = async (
  input: InputTypeMarkUserEmailVerified,
): Promise<ReturnTypeMarkUserEmailVerified> => {
  try {
    await db.user.update({
      where: { email: input.email, name: input.name },
      data: { emailVerified: true },
    })
    return { data: "Email marked as verified" }
  } catch {
    return { error: "Failed to verify email" }
  }
}
