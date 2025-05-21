"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { messages } from "~/config/messages"
import { auth } from "~/lib/auth"
import { createAction, createActionWithAuth } from "~/lib/safe-action"
import {
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  setPasswordSchema,
} from "./schema"
import {
  InputTypeChangePassword,
  InputTypeForgotPassword,
  InputTypeResetPassword,
  InputTypeSetPassword,
  ReturnTypeChangePassword,
  ReturnTypeForgotPassword,
  ReturnTypeResetPassword,
  ReturnTypeSetPassword,
} from "./types"

const setPasswordHandler = async (
  input: InputTypeSetPassword,
): Promise<ReturnTypeSetPassword> => {
  try {
    const { status } = await auth.api.setPassword({
      body: { newPassword: input.newPassword },
      headers: await headers(),
    })
    if (!status) return { error: messages.set_password_error }
    if (input.currentPath) revalidatePath(input.currentPath)
    return {
      data: {
        message: messages.set_password_success,
        description: messages.set_password_description,
      },
    }
  } catch {
    return { error: messages.set_password_error }
  }
}

const changePasswordHandler = async (
  input: InputTypeChangePassword,
): Promise<ReturnTypeChangePassword> => {
  try {
    await auth.api.changePassword({
      body: {
        currentPassword: input.oldPassword,
        newPassword: input.newPassword,
        revokeOtherSessions: input.revokeSessions,
      },
    })
    return {
      data: {
        message: messages.change_password_success,
        description: messages.change_password_description,
      },
    }
  } catch {
    return { error: "Failed to change password" }
  }
}

const forgotPasswordHandler = async (
  values: InputTypeForgotPassword,
): Promise<ReturnTypeForgotPassword> => {
  try {
    const { status } = await auth.api.forgetPassword({
      body: {
        email: values.email,
        redirectTo: "/auth/set-password",
      },
    })
    if (!status) return { error: messages.forgot_password_error }
    return { data: { message: messages.forgot_password_success } }
  } catch {
    return { error: messages.forgot_password_error }
  }
}

const resetPasswordHandler = async (
  input: InputTypeResetPassword,
): Promise<ReturnTypeResetPassword> => {
  try {
    const { status } = await auth.api.resetPassword({
      body: { newPassword: input.password, token: input.token },
    })
    if (!status) return { error: messages.reset_password_error }
    return {
      data: {
        message: messages.reset_password_success,
        description: messages.reset_password_description,
      },
    }
  } catch {
    return { error: messages.reset_password_error }
  }
}

export const changePassword = createActionWithAuth(
  changePasswordSchema,
  changePasswordHandler,
)
export const setPassword = createActionWithAuth(setPasswordSchema, setPasswordHandler)
export const forgotPassword = createAction(forgotPasswordSchema, forgotPasswordHandler)
export const resetPassword = createAction(resetPasswordSchema, resetPasswordHandler)
