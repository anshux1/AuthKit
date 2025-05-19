import { z } from "zod"
import { ActionState } from "~/types/action"
import { markEmailVerifiedSchema, updateProfileSchema } from "./schema"

export type InputTypeMarkUserEmailVerified = z.infer<typeof markEmailVerifiedSchema>
export type ReturnTypeMarkUserEmailVerified = ActionState<
  InputTypeMarkUserEmailVerified,
  string
>
export type InputTypeUpdateProfile = z.infer<typeof updateProfileSchema>
export type ReturnTypeUpdateProfile = ActionState<InputTypeUpdateProfile, string>
