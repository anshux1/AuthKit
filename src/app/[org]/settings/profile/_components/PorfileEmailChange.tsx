"use client"

import { ReactNode } from "react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { changeEmailRequest } from "~/action/auth"
import { changeEmailRequestSchema } from "~/action/auth/schema"
import { InputTypeChangeEmailRequest } from "~/action/auth/types"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import {
  DialogDrawer,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "~/components/ui/dialog-drawer"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export const EmailChangeForm = ({
  email,
  children,
}: {
  email: string
  children: ReactNode
}) => {
  const { dictionary } = useDictionary()
  const form = useForm<InputTypeChangeEmailRequest>({
    resolver: standardSchemaResolver(changeEmailRequestSchema),
    defaultValues: {
      email: "",
    },
  })

  const { execute, isLoading } = useAction(changeEmailRequest, {
    onSuccess: (data) => toast(data),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (value: InputTypeChangeEmailRequest) => execute(value)
  return (
    <DialogDrawer>
      <DialogDrawerTrigger asChild>{children}</DialogDrawerTrigger>
      <DialogDrawerContent className="w-full sm:max-w-md">
        <DialogDrawerHeader className="px-6 sm:px-0">
          <DialogDrawerTitle>{dictionary.change_email_header}</DialogDrawerTitle>
        </DialogDrawerHeader>
        <div className="space-y-3 p-6 pt-0 sm:p-0">
          <div className="space-y-2">
            <Label>{dictionary.current_email_label}</Label>
            <div className="flex rounded-md shadow-xs">
              <Input defaultValue={email} disabled type="email" />
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <InputField
                control={form.control}
                name="email"
                type="email"
                label={dictionary.new_email_label}
                placeholder={dictionary.new_email_placeholder}
              />
              <p className="text-muted-foreground text-sm">
                {dictionary.change_email_instruction}
              </p>
              <div className="flex w-full justify-end space-x-2">
                <DialogDrawerClose asChild>
                  <Button variant="secondary">{dictionary.cancle}</Button>
                </DialogDrawerClose>
                <Button disabled={isLoading} onSubmit={() => onSubmit(form.getValues())}>
                  {dictionary.change}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogDrawerContent>
    </DialogDrawer>
  )
}
