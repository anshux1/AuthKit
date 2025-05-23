import { z } from "zod"

export const createOrganizationSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  image: z.string().optional(),
  slug: z.string().min(1, { message: "Slug cannot be empty" }),
  imageRemoved: z.boolean().optional(),
  currentPath: z.string().optional(),
  fromOnboarding: z.boolean().optional(),
})

export const deleteOrganizationSchema = z.object({
  organizationId: z.string().min(1, { message: "Organization ID cannot be empty" }),
  currentPath: z.string().optional(),
})
