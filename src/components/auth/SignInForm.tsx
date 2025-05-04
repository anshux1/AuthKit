"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "~/action/auth"
import { signInSchema } from "~/action/auth/schema"
import { InputTypeSignIn } from "~/action/auth/types"
import { Lock, Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export function SignInForm() {
  const { dictionary } = useDictionary()
  const form = useForm<InputTypeSignIn>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { execute, isLoading } = useAction(signIn, {
    onSuccess: (data) => toast(data.message, { description: data.description }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (values: InputTypeSignIn) => execute(values)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-3 w-full space-y-3">
        <InputField
          control={form.control}
          name="email"
          type="email"
          label={dictionary.email_label}
          className="h-10"
          placeholder={dictionary.email_placeholder}
          withIconPrefix
          Icon={Mail}
        />
        <div className="relative flex flex-col gap-1">
          <InputField
            control={form.control}
            name="password"
            label={dictionary.password_label}
            className="h-10"
            withIconPrefix
            Icon={Lock}
            placeholder={dictionary.password_placeholder}
            type="password"
          />
          <Link
            href="/auth/forgot-password"
            className="absolute top-0 right-0 -mt-0.5 text-sm hover:underline"
          >
            {dictionary.forgot_password_header}
          </Link>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? dictionary.please_wait : dictionary.sign_in}
        </Button>
      </form>
    </Form>
  )
}
