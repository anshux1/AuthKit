"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { auth } from "~/lib/auth"
import { createActionWithAuth } from "~/lib/safe-action"
import { AuthContext } from "~/types/auth"
import { deleteBlob } from "../azure"
import { updateProfileSchema } from "./schema"
import { InputTypeUpdateProfile, ReturnTypeUpdateProfile } from "./types"

const updateProfileHandler = async (
  input: InputTypeUpdateProfile,
  ctx: AuthContext,
): Promise<ReturnTypeUpdateProfile> => {
  try {
    const response = await auth.api.updateUser({
      headers: await headers(),
      body: { name: input.name, image: input.image },
    })
    if (
      ctx.user.image?.includes(".blob.core.windows.net") &&
      input.image !== ctx.user.image
    ) {
      await deleteBlob({
        url: ctx.user.image,
      })
    }
    if (input.currentPath) revalidatePath(input.currentPath)
    return {
      data: response.status ? "" : "",
    }
  } catch (err) {
    console.log("Error :", err)
    return { error: "" }
  }
}

export const updateProfile = createActionWithAuth(
  updateProfileSchema,
  updateProfileHandler,
)
