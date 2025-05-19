import { z } from "zod"
import { ActionResponse, ActionState } from "~/types/action"
import {
  changeEmailRequestSchema,
  magicLinkLoginSchema,
  signInSchema,
  signUpSchema,
} from "./schema"

export type InputTypeMagicLinkLogin = z.infer<typeof magicLinkLoginSchema>
export type ReturnTypeMagicLinkLogin = ActionState<
  InputTypeMagicLinkLogin,
  ActionResponse
>

export type InputTypeSignIn = z.infer<typeof signInSchema>
export type ReturnTypeSignIn = ActionState<InputTypeSignIn, ActionResponse>

export type InputTypeSignUp = z.infer<typeof signUpSchema>
export type ReturnTypeSignUp = ActionState<InputTypeSignUp, ActionResponse>

export type InputTypeChangeEmailRequest = z.infer<typeof changeEmailRequestSchema>
export type ReturnTypeChangeEmailRequest = ActionState<
  InputTypeChangeEmailRequest,
  string
>
