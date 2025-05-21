"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { messages } from "~/config/messages"
import { auth } from "~/lib/auth"
import { createActionWithAuth } from "~/lib/safe-action"
import { revokeSessionSchema } from "./schema"
import { InputTypeRevokeSession, ReturnTypeRevokeSession } from "./types"

const revokeSessionHandler = async (
  input: InputTypeRevokeSession,
): Promise<ReturnTypeRevokeSession> => {
  try {
    const data = await auth.api.revokeSession({
      body: { ...input },
      headers: await headers(),
    })
    if (!data.status) return { error: messages.revoke_session_error }
    if (input.pathname) revalidatePath(input.pathname)
    return { data: messages.revoke_session_success }
  } catch {
    return { error: messages.revoke_session_error }
  }
}

export const revokeSession = createActionWithAuth(
  revokeSessionSchema,
  revokeSessionHandler,
)
