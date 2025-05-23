"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { deleteUser } from "~/action/auth"
import { deleteUserSchema } from "~/action/auth/schema"
import { InputTypeDeleteUser } from "~/action/auth/types"
import { LockIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import {
  DialogDrawer,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerDescription,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "~/components/ui/dialog-drawer"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export function UserDeleteCard() {
  const { dictionary } = useDictionary()
  const router = useRouter()
  const form = useForm<InputTypeDeleteUser>({
    resolver: standardSchemaResolver(deleteUserSchema),
    defaultValues: {
      password: "",
    },
  })

  const { execute, isLoading } = useAction(deleteUser, {
    onSuccess: (data) => {
      toast(data)
      router.replace("/auth/sign-in")
    },
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (value: InputTypeDeleteUser) => execute(value)

  return (
    <Card className="shadow-none">
      <CardContent>
        <p className="text-muted-foreground text-sm">
          {dictionary.delete_account_card_description}
        </p>
      </CardContent>
      <CardFooter className="flex justify-end border-t pt-3 pb-0">
        <DialogDrawer>
          <DialogDrawerTrigger asChild>
            <Button variant="destructive">{dictionary.delete_account_button}</Button>
          </DialogDrawerTrigger>
          <DialogDrawerContent className="w-full sm:max-w-md">
            <DialogDrawerHeader className="px-6 sm:px-0">
              <DialogDrawerTitle>
                {dictionary.delete_account_instruction_header}
              </DialogDrawerTitle>
              <DialogDrawerDescription>
                {dictionary.delete_account_instruction_description}
              </DialogDrawerDescription>
            </DialogDrawerHeader>
            <div className="space-y-3 p-6 pt-0 sm:p-0">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                  <InputField
                    control={form.control}
                    name="password"
                    type="password"
                    label={dictionary.delete_account_password_label}
                    placeholder={dictionary.delete_account_password_placeholder}
                    withIconPrefix
                    Icon={LockIcon}
                  />
                  <div className="mt-2 flex w-full justify-end space-x-2">
                    <DialogDrawerClose asChild>
                      <Button variant="secondary">{dictionary.cancle}</Button>
                    </DialogDrawerClose>
                    <Button
                      disabled={isLoading}
                      variant="destructive"
                      onSubmit={() => onSubmit(form.getValues())}
                    >
                      {dictionary.delete_account_button}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogDrawerContent>
        </DialogDrawer>
      </CardFooter>
    </Card>
  )
}
