import { Organization } from "better-auth/plugins"
import { z } from "zod"
import { ActionState } from "~/types/action"
import { createWorkspaceSchema, deleteWorkspaceSchema } from "./schema"

export type InputTypeCreateWorkspace = z.infer<typeof createWorkspaceSchema>
export type ReturnTypeCreateWorkspace = ActionState<
  InputTypeCreateWorkspace,
  Organization
>

export type InputTypeDeleteWorkspace = z.infer<typeof deleteWorkspaceSchema>
export type ReturnTypeDeleteWorkspace = ActionState<InputTypeDeleteWorkspace, string>
