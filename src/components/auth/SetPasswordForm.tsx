"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  resetPassword as resetPasswordHandler,
  setPassword as setPasswordHandler,
} from "~/action/auth/password"
import { setPasswordSchema } from "~/action/auth/password/schema"
import { InputTypeSetPassword } from "~/action/auth/password/types"
import { Lock } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

interface SetPasswordFormProps {
  reset?: boolean
  token?: string
}

export function SetPasswordForm({ reset, token }: SetPasswordFormProps) {
  const { dictionary } = useDictionary()
  const form = useForm<InputTypeSetPassword>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })
  const { execute: setPasswordFn, isLoading: isSetting } = useAction(setPasswordHandler, {
    onSuccess: (data) => toast(data.message),
    onError: (error) => toast.error(error),
  })

  const { execute: resetPasswordFn, isLoading: isResetting } = useAction(
    resetPasswordHandler,
    {
      onSuccess: (data) => toast(data.message),
      onError: (error) => toast.error(error),
    },
  )

  const onSubmit = async (values: InputTypeSetPassword) => {
    if (reset) {
      await resetPasswordFn({
        token: token as string,
        password: values.newPassword,
        confirmPassword: values.confirmPassword,
      })
    } else {
      await setPasswordFn(values)
    }
  }

  const isLoading = isSetting || isResetting
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 w-full space-y-3">
        <InputField
          control={form.control}
          name="newPassword"
          label={dictionary.new_password_label}
          className="h-10"
          withIconPrefix
          Icon={Lock}
          placeholder={dictionary.new_password_placeholder}
          type="password"
        />
        <InputField
          control={form.control}
          name="confirmPassword"
          label={dictionary.confirm_password_label}
          className="h-10"
          withIconPrefix
          Icon={Lock}
          placeholder={dictionary.confirm_password_placeholder}
          type="password"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading || isResetting ? dictionary.please_wait : dictionary.set_password}
        </Button>
      </form>
    </Form>
  )
}
