"use server"

import { messages } from "~/config/messages"
import db from "~/db"
import { createActionWithAuth } from "~/lib/safe-action"
import { AuthContext } from "~/types/auth"
import { profileOnboardingSchema } from "./schema"
import { InputTypeProfileOnboarding, ReturnTypeProfileOnbooarding } from "./types"

const profileOnboardingHandler = async (
  input: InputTypeProfileOnboarding,
  ctx: AuthContext,
): Promise<ReturnTypeProfileOnbooarding> => {
  try {
    const data = await db.user.update({
      where: { email: ctx.user.email },
      data: {
        name: input.name,
        image: input.image,
        onboardingStep: "organization",
      },
    })
    return { data }
  } catch {
    return { error: messages.profile_onboarding_error }
  }
}

export const profileOnboarding = createActionWithAuth(
  profileOnboardingSchema,
  profileOnboardingHandler,
)
