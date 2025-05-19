"use client"

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { magicLinkLogin } from "~/action/auth"
import { magicLinkLoginSchema } from "~/action/auth/schema"
import { InputTypeMagicLinkLogin } from "~/action/auth/types"
import { Mail } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

interface MagicLinkLoginProps {
  email?: string
  isInvitation?: boolean
  inviteLink?: string
}

export function MagicLinkForm({ isInvitation, inviteLink, email }: MagicLinkLoginProps) {
  const { dictionary } = useDictionary()
  const form = useForm<InputTypeMagicLinkLogin>({
    resolver: standardSchemaResolver(magicLinkLoginSchema),
    defaultValues: {
      email: email,
      inviteLink: isInvitation ? inviteLink : undefined,
    },
  })
  const { execute, isLoading } = useAction(magicLinkLogin, {
    onSuccess: () =>
      toast(dictionary.magic_link_success, {
        description: dictionary.magic_link_success_description,
      }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (values: InputTypeMagicLinkLogin) => execute(values)

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
          {isLoading ? dictionary.please_wait : dictionary.send_magic_link}
        </Button>
      </form>
    </Form>
  )
}
