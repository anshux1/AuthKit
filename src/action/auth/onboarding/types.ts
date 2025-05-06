import { User } from "@prisma/client"
import { z } from "zod"
import { ActionState } from "~/types/action"
import { profileOnboardingSchema } from "./schema"

export type InputTypeProfileOnboarding = z.infer<typeof profileOnboardingSchema>
export type ReturnTypeProfileOnbooarding = ActionState<InputTypeProfileOnboarding, User>
