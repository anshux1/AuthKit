"use client"

import React, { useState } from "react"
import { usePathname } from "next/navigation"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { setPassword } from "~/action/auth/password"
import { setPasswordSchema } from "~/action/auth/password/schema"
import { InputTypeSetPassword } from "~/action/auth/password/types"
import { LockIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { PasswordStrengthChecker } from "~/components/common/PasswordStrengthChecker"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export const PasswordSetForm = () => {
  const { dictionary } = useDictionary()
  const pathname = usePathname()
  const [isPasswordValid, setIsPasswordValid] = useState(false)

  const form = useForm<InputTypeSetPassword>({
    resolver: standardSchemaResolver(setPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      currentPath: pathname,
    },
  })
  const { execute, isLoading } = useAction(setPassword, {
    onSuccess: (data) => toast(data.message, { description: data.description }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (data: InputTypeSetPassword) => {
    if (!isPasswordValid) {
      toast.error(dictionary.password_strength_error)
      return
    }
    await execute(data)
  }

  return (
    <Card className="shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pb-6">
            <InputField
              control={form.control}
              type="password"
              name="newPassword"
              label={dictionary.new_password_label}
              placeholder={dictionary.new_password_placeholder}
              withIconPrefix
              Icon={LockIcon}
            />
            <PasswordStrengthChecker
              setIsPasswordValidAction={setIsPasswordValid}
              password={form.watch("newPassword")}
            />
            <InputField
              control={form.control}
              type="password"
              name="confirmPassword"
              label={dictionary.confirm_password_label}
              placeholder={dictionary.confirm_password_placeholder}
              withIconPrefix
              Icon={LockIcon}
            />
          </CardContent>
          <CardFooter className="flex justify-end border-t pb-0">
            <Button type="submit">
              {isLoading ? dictionary.please_wait : dictionary.save}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
