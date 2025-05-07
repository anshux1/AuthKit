"use client"

import React, { useCallback } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { profileNameSchema } from "~/action/auth/onboarding/schema"
import {
  InputTypeProfileName,
  InputTypeProfileOnboarding,
} from "~/action/auth/onboarding/types"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { authClient } from "~/lib/auth/client"
import { cn } from "~/lib/utils"
import { useDictionary } from "~/store/language"

interface ProfileNameFormProps {
  name: string
  className?: string
}

export function ProfileNameForm({ name, className }: ProfileNameFormProps) {
  const { dictionary } = useDictionary()
  const [isLoading, setIsLoading] = React.useState(false)

  const form = useForm<InputTypeProfileName>({
    resolver: zodResolver(profileNameSchema),
    defaultValues: { name },
  })

  const currentName = form.watch("name")

  const onSubmit = useCallback(
    async (values: InputTypeProfileOnboarding) => {
      if (values.name === name) return

      setIsLoading(true)
      const { data } = await authClient.updateUser({ name: values.name })

      if (data?.status) {
        toast(dictionary.profile_name_change_success)
      } else {
        toast.error(dictionary.profile_name_change_error)
      }

      setIsLoading(false)
    },
    [name],
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex items-end gap-2", className)}
      >
        <InputField
          control={form.control}
          name="name"
          label={dictionary.name_label}
          placeholder={dictionary.name_placeholder}
        />
        <Button
          className={cn(currentName !== name ? "block" : "hidden")}
          disabled={isLoading || currentName === name}
          aria-disabled={isLoading}
        >
          {isLoading ? dictionary.please_wait : dictionary.save}
        </Button>
      </form>
    </Form>
  )
}
