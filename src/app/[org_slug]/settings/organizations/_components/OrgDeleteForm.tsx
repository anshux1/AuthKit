"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { deleteOrganization } from "~/action/organization"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import {
  DialogDrawer,
  DialogDrawerClose,
  DialogDrawerContent,
  DialogDrawerDescription,
  DialogDrawerHeader,
  DialogDrawerTitle,
  DialogDrawerTrigger,
} from "~/components/ui/dialog-drawer"
import { useAction } from "~/hooks/useAction"
import { useDictionary } from "~/store/language"

interface OrgDeleteFormProps {
  children: React.ReactNode
  organizationId: string
}
export function OrgDeleteForm({ children, organizationId }: OrgDeleteFormProps) {
  const router = useRouter()
  const { dictionary } = useDictionary()

  const { execute, isLoading } = useAction(deleteOrganization, {
    onSuccess: (data) => {
      toast(data)
      router.replace("/auth/sign-in")
    },
    onError: (error) => toast.error(error),
  })

  const onSubmit = async () => execute({ organizationId })

  return (
    <DialogDrawer>
      <DialogDrawerTrigger asChild>{children}</DialogDrawerTrigger>
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
          <div className="mt-2 flex w-full justify-end space-x-2">
            <DialogDrawerClose asChild>
              <Button variant="secondary">{dictionary.cancle}</Button>
            </DialogDrawerClose>
            <Button
              aria-label={dictionary.delete_account_button}
              disabled={isLoading}
              variant="destructive"
              onClick={onSubmit}
            >
              {dictionary.delete_account_button}
            </Button>
          </div>
        </div>
      </DialogDrawerContent>
    </DialogDrawer>
  )
}
