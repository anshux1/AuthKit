import { z } from "zod"
import { ActionState } from "~/types/action"
import { revokeSessionSchema } from "./schema"

export type InputTypeRevokeSession = z.infer<typeof revokeSessionSchema>
export type ReturnTypeRevokeSession = ActionState<InputTypeRevokeSession, string>
