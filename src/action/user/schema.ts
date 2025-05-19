import { z } from "zod"

export const markEmailVerifiedSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
})

export const updateProfileSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty" }),
  image: z.string().optional(),
  imageRemoved: z.boolean().optional(),
  currentPath: z.string().optional(),
})
