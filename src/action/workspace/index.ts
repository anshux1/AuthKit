"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { messages } from "~/config/messages"
import db from "~/db"
import { auth } from "~/lib/auth"
import { createActionWithAuth } from "~/lib/safe-action"
import { AuthContext } from "~/types/auth"
import { createWorkspaceSchema, deleteWorkspaceSchema } from "./schema"
import {
  InputTypeCreateWorkspace,
  InputTypeDeleteWorkspace,
  ReturnTypeCreateWorkspace,
  ReturnTypeDeleteWorkspace,
} from "./types"

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
      return { error: messages.create_workspace_error }
    }
    return { data }
  } catch (err) {
    console.log(err)
    return { error: messages.create_workspace_error }
  }
}

const deleteWorkspaceHandler = async (
  input: InputTypeDeleteWorkspace,
): Promise<ReturnTypeDeleteWorkspace> => {
  try {
    await auth.api.deleteOrganization({
      body: {
        organizationId: input.organizationId,
      },
      headers: await headers(),
    })
    return { data: messages.delete_workspace_success }
  } catch (err) {
    console.log(err)
    return { error: messages.delete_workspace_error }
  }
}

export const createWorkspace = createActionWithAuth(
  createWorkspaceSchema,
  createWorkspaceHandler,
)

export const deleteWorkspace = createActionWithAuth(
  deleteWorkspaceSchema,
  deleteWorkspaceHandler,
)
