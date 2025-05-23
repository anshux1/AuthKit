"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { messages } from "~/config/messages"
import db from "~/db"
import { auth } from "~/lib/auth"
import { createActionWithAuth } from "~/lib/safe-action"
import { AuthContext } from "~/types/auth"
import { createOrganizationSchema, deleteOrganizationSchema } from "./schema"
import {
  InputTypeCreateOrganization,
  InputTypeDeleteOrganization,
  ReturnTypeCreateOrganization,
  ReturnTypeDeleteOrganization,
} from "./types"

const createOrganizationHandler = async (
  input: InputTypeCreateOrganization,
  ctx: AuthContext,
): Promise<ReturnTypeCreateOrganization> => {
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
          onboardingStep: "organization",
        },
      })
    }
    if (input.currentPath) revalidatePath(input.currentPath)
    if (!data) {
      return { error: messages.create_organization_error }
    }
    return { data }
  } catch (err) {
    console.log(err)
    return { error: messages.create_organization_error }
  }
}

const deleteOrganizationHandler = async (
  input: InputTypeDeleteOrganization,
): Promise<ReturnTypeDeleteOrganization> => {
  try {
    await auth.api.deleteOrganization({
      body: {
        organizationId: input.organizationId,
      },
      headers: await headers(),
    })
    return { data: messages.delete_organization_success }
  } catch (err) {
    console.log(err)
    return { error: messages.delete_organization_error }
  }
}

export const createOrganization = createActionWithAuth(
  createOrganizationSchema,
  createOrganizationHandler,
)

export const deleteOrganization = createActionWithAuth(
  deleteOrganizationSchema,
  deleteOrganizationHandler,
)
