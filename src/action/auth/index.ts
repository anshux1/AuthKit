"use server"

import { headers } from "next/headers"
import { messages } from "~/config/messages"
import { auth } from "~/lib/auth"
import { createAction, createActionWithAuth } from "~/lib/safe-action"
import {
  changeEmailRequestSchema,
  deleteUserSchema,
  magicLinkLoginSchema,
  signInSchema,
  signUpSchema,
} from "./schema"
import {
  InputTypeChangeEmailRequest,
  InputTypeDeleteUser,
  InputTypeMagicLinkLogin,
  InputTypeSignIn,
  InputTypeSignUp,
  ReturnTypeChangeEmailRequest,
  ReturnTypeDeleteUser,
  ReturnTypeMagicLinkLogin,
  ReturnTypeSignIn,
  ReturnTypeSignUp,
} from "./types"

const signInHandler = async (input: InputTypeSignIn): Promise<ReturnTypeSignIn> => {
  try {
    const data = await auth.api.signInEmail({
      body: {
        email: input.email,
        password: input.password,
        callbackURL: "/dashboard",
      },
    })

    return {
      data: {
        message: messages.sign_in_success + data.user.email,
        description: messages.sign_in_description,
      },
    }
  } catch {
    return { error: messages.sign_in_error }
  }
}

const signUpHandler = async (input: InputTypeSignUp): Promise<ReturnTypeSignUp> => {
  try {
    const data = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        onboardingStep: "profile",
      },
    })
    const identifier = data.user.name || data.user.email
    return {
      data: {
        message: `${messages.sign_up_success} ${identifier}`,
        description: messages.sign_up_description,
      },
    }
  } catch {
    return { error: messages.sign_up_error }
  }
}

const magicLinkLoginHandler = async (
  input: InputTypeMagicLinkLogin,
): Promise<ReturnTypeMagicLinkLogin> => {
  try {
    const data = await auth.api.signInMagicLink({
      body: {
        email: input.email,
        callbackURL: input.inviteLink,
      },
      headers: await headers(),
    })

    if (!data.status) {
      return { error: messages.magic_link_error }
    }
    return {
      data: {
        message: messages.magic_link_success,
        description: messages.magic_link_description,
      },
    }
  } catch {
    return { error: messages.magic_link_error }
  }
}

const changeEmailRequestHandler = async (
  input: InputTypeChangeEmailRequest,
): Promise<ReturnTypeChangeEmailRequest> => {
  try {
    await auth.api.changeEmail({
      body: { newEmail: input.email },
      headers: await headers(),
    })
    return { data: messages.email_change_req_success }
  } catch {
    return { error: messages.email_change_req_error }
  }
}
const deleteUserHandler = async (
  input: InputTypeDeleteUser,
): Promise<ReturnTypeDeleteUser> => {
  try {
    await auth.api.deleteUser({
      headers: await headers(),
      body: { password: input.password },
    })
    return { data: messages.delete_account_success }
  } catch {
    return { error: messages.delete_account_error }
  }
}

export const signIn = createAction(signInSchema, signInHandler)
export const signUp = createAction(signUpSchema, signUpHandler)
export const magicLinkLogin = createAction(magicLinkLoginSchema, magicLinkLoginHandler)
export const changeEmailRequest = createActionWithAuth(
  changeEmailRequestSchema,
  changeEmailRequestHandler,
)
export const deleteUser = createActionWithAuth(deleteUserSchema, deleteUserHandler)
