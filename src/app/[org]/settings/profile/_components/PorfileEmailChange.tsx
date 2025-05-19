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

export const EmailChangeForm = ({
  email,
  children,
}: {
  email: string
  children: ReactNode
}) => {
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
      <DialogDrawerContent className="w-full sm:max-w-sm">
        <DialogDrawerHeader>
          <DialogDrawerTitle>Change email address</DialogDrawerTitle>
        </DialogDrawerHeader>
        <div className="space-y-2">
          <Label>Current email address</Label>
          <div className="flex rounded-md shadow-xs">
            <Input placeholder="Email" defaultValue={email} disabled type="email" />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <InputField
              control={form.control}
              name="email"
              type="email"
              label="New Email"
              placeholder="Enter new email"
            />
            <div className="flex w-full justify-end space-x-2">
              <DialogDrawerClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogDrawerClose>
              <Button disabled={isLoading} onSubmit={() => onSubmit(form.getValues())}>
                Change
              </Button>
            </div>
          </form>
        </Form>
      </DialogDrawerContent>
    </DialogDrawer>
  )
}
