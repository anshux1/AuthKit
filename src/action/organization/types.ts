import { Organization } from "better-auth/plugins"
import { z } from "zod"
import { ActionState } from "~/types/action"
import { createOrganizationSchema, deleteOrganizationSchema } from "./schema"

export type InputTypeCreateOrganization = z.infer<typeof createOrganizationSchema>
export type ReturnTypeCreateOrganization = ActionState<
  InputTypeCreateOrganization,
  Organization
>

export type InputTypeDeleteOrganization = z.infer<typeof deleteOrganizationSchema>
export type ReturnTypeDeleteOrganization = ActionState<
  InputTypeDeleteOrganization,
  string
>
