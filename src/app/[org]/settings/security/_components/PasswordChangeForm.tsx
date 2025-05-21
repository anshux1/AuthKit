"use client"

import React, { useState } from "react"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { changePassword } from "~/action/auth/password"
import { changePasswordSchema } from "~/action/auth/password/schema"
import { InputTypeChangePassword } from "~/action/auth/password/types"
import { LockIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Form } from "~/components/ui/form"
import { CheckboxField, InputField } from "~/components/ui/form-fields"
import { PasswordStrengthChecker } from "~/components/common/PasswordStrengthChecker"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

export const PasswordChangeForm = () => {
  const { dictionary } = useDictionary()
  const [isPasswordValid, setIsPasswordValid] = useState(false)
  const form = useForm<InputTypeChangePassword>({
    resolver: standardSchemaResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      revokeSessions: false,
    },
  })

  const { execute, isLoading } = useAction(changePassword, {
    onSuccess: (data) => toast(data.message, { description: data.description }),
    onError: (error) => toast.error(error),
  })

  const onSubmit = async (data: InputTypeChangePassword) => {
    if (!isPasswordValid) {
      toast.error(dictionary.password_strength_error)
      return
    }
    execute(data)
  }

  return (
    <Card className="shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pb-6">
            <InputField
              control={form.control}
              type="password"
              name="oldPassword"
              label={dictionary.old_password_label}
              placeholder={dictionary.old_password_placeholder}
              withIconPrefix
              Icon={LockIcon}
            />
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
            <div>
              <CheckboxField
                control={form.control}
                name="revokeSessions"
                label={dictionary.revoke_other_sessions_header}
              />
              <p className="text-muted-foreground ml-2.5 text-sm">
                {dictionary.revoke_other_sessions_description}
              </p>
            </div>
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
