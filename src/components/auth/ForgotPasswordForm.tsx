"use client"

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { forgotPassword } from "~/action/auth/password"
import { forgotPasswordSchema } from "~/action/auth/password/schema"
import { InputTypeForgotPassword } from "~/action/auth/password/types"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export function ForgotPasswordForm() {
  const { dictionary } = useDictionary()
  const form = useForm<InputTypeForgotPassword>({
    resolver: standardSchemaResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })
  const { execute, isLoading } = useAction(forgotPassword, {
    onSuccess: (data) =>
      toast(data.message, {
        description: data.description,
      }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (values: InputTypeForgotPassword) => execute(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <InputField
          control={form.control}
          name="email"
          type="email"
          Icon={Mail}
          placeholder={dictionary.email_placeholder}
          label={dictionary.email_label}
          withIconPrefix
        />
        <Button disabled={isLoading} className="w-full">
          {isLoading ? dictionary.please_wait : dictionary.reset_password}
        </Button>
      </form>
    </Form>
  )
}
