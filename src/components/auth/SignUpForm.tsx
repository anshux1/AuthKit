"use client"

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { signUp } from "~/action/auth"
import { signUpSchema } from "~/action/auth/schema"
import { InputTypeSignUp } from "~/action/auth/types"
import { Lock, Mail, User } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export function SignupForm() {
  const { dictionary } = useDictionary()
  const form = useForm<InputTypeSignUp>({
    resolver: standardSchemaResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const { execute, isLoading } = useAction(signUp, {
    onSuccess: (data) =>
      toast(data.message, {
        description: data.description,
      }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (values: InputTypeSignUp) => execute(values)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (e) => console.log(e))}
        className="mt-3 space-y-3"
      >
        <InputField
          control={form.control}
          name="name"
          withIconPrefix
          Icon={User}
          label={dictionary.name_label}
          placeholder={dictionary.name_placeholder}
        />
        <InputField
          control={form.control}
          name="email"
          type="email"
          label={dictionary.email_label}
          placeholder={dictionary.email_placeholder}
          withIconPrefix
          Icon={Mail}
        />
        <InputField
          control={form.control}
          name="password"
          label={dictionary.password_label}
          withIconPrefix
          Icon={Lock}
          placeholder={dictionary.password_placeholder}
          type="password"
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? dictionary.please_wait : dictionary.sign_up}
        </Button>
      </form>
    </Form>
  )
}
