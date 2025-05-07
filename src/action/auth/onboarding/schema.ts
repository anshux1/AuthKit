import { z } from "zod"

export const profileOnboardingSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  image: z.string().optional(),
})

export const profileNameSchema = profileOnboardingSchema.omit({ image: true })
