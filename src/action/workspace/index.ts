"use server"

import { revalidatePath } from "next/cache"
import db from "~/db"
import { auth } from "~/lib/auth"
import { createActionWithAuth } from "~/lib/safe-action"
import { AuthContext } from "~/types/auth"
import { createWorkspaceSchema } from "./schema"
import { InputTypeCreateWorkspace, ReturnTypeCreateWorkspace } from "./types"

const createWorkspaceHandler = async (
  input: InputTypeCreateWorkspace,
  ctx: AuthContext,
): Promise<ReturnTypeCreateWorkspace> => {
  try {
    const data = await auth.api.createOrganization({
      body: {
        name: input.name,
        slug: input.slug,
        userId: ctx.user.id,
        logo: input.image,
      },
    })
    if (input.fromOnboarding) {
      await db.user.update({
        where: { email: ctx.user.email },
        data: {
          onboardingStatus: "completed",
          onboardingStep: "workspace",
        },
      })
    }
    if (input.currentPath) revalidatePath(input.currentPath)
    if (!data) {
      return { error: "Failed to create organization" }
    }
    return { data }
  } catch (err) {
    console.log(err)
    return { error: "Failed to create organization" }
  }
}

export const createWorkspace = createActionWithAuth(
  createWorkspaceSchema,
  createWorkspaceHandler,
)
