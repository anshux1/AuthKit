import { z } from "zod"

export const markEmailVerifiedSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
})
