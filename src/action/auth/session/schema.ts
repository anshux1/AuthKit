import { z } from "zod"

export const revokeSessionSchema = z.object({
  token: z.string(),
  pathname: z.string(),
})
