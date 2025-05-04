import { z } from "zod"
import { ActionResponse, ActionState } from "~/types/action"
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  setPasswordSchema,
} from "./schema"

export type InputTypeForgotPassword = z.infer<typeof forgotPasswordSchema>
export type ReturnTypeForgotPassword = ActionState<
  InputTypeForgotPassword,
  ActionResponse
>

export type InputTypeResetPassword = z.infer<typeof resetPasswordSchema>
export type ReturnTypeResetPassword = ActionState<InputTypeResetPassword, ActionResponse>

export type InputTypeSetPassword = z.infer<typeof setPasswordSchema>
export type ReturnTypeSetPassword = ActionState<InputTypeSetPassword, ActionResponse>

export type InputTypeChangePassword = z.infer<typeof changePasswordSchema>
export type ReturnTypeChangePassword = ActionState<
  InputTypeChangePassword,
  ActionResponse
>
