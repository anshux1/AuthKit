import { z } from "zod"
import { ActionState } from "~/types/action"
import { markEmailVerifiedSchema } from "./schema"

export type InputTypeMarkUserEmailVerified = z.infer<typeof markEmailVerifiedSchema>
export type ReturnTypeMarkUserEmailVerified = ActionState<
  InputTypeMarkUserEmailVerified,
  string
>
