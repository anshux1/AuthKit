"use client"

import React, { useCallback, useId, useRef } from "react"
import { usePathname } from "next/navigation"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { deleteBlob as deleteBlobHandler } from "~/action/azure"
import { updateProfileSchema } from "~/action/user/schema"
import { InputTypeUpdateProfile } from "~/action/user/types"
import { updateProfile as updateProfileHandler } from "~/action/user/user"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardFooter } from "~/components/ui/card"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { UploadImage } from "~/components/upload-image"
import { useAction } from "~/hooks/useAction"
import { useFileUpload } from "~/hooks/useFileUpload"
import { useDictionary } from "~/store/language"
import { EmailChangeForm } from "./PorfileEmailChange"

interface PersonalDetailsProps {
  email?: string
  name?: string
  image?: string
}

export const PersonalDetails = ({ name, email, image }: PersonalDetailsProps) => {
  const id = useId()
  const pathname = usePathname()
  const { dictionary } = useDictionary()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<InputTypeUpdateProfile>({
    resolver: standardSchemaResolver(updateProfileSchema),
    defaultValues: {
      name: name || "",
      image: image || "",
      imageRemoved: false,
      currentPath: pathname,
    },
  })

  const { execute: updateProfile, isLoading } = useAction(updateProfileHandler, {
    onSuccess: (data) => toast.success(data),
    onError: (error) => toast.error(error),
  })

  const { execute: deleteBlob } = useAction(deleteBlobHandler)

  const { uploadFile, isUploading, progress } = useFileUpload({
    onSuccess: async (url) => {
      if (url === form.getValues("image")) return
      form.setValue("image", url, { shouldValidate: true })
      form.setValue("imageRemoved", false, { shouldValidate: true })
    },
    onError: () => toast.error(dictionary.profile_image_change_error),
  })

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2MB")
        return
      }

      await uploadFile(file)
    },
    [uploadFile],
  )

  const handleRemoveImage = useCallback(async () => {
    const currentImage = form.getValues("image")
    if (currentImage && currentImage !== image) {
      await deleteBlob({ url: currentImage })
    }
    form.setValue("image", "", { shouldValidate: true })
    form.setValue("imageRemoved", true, { shouldValidate: true })
  }, [form, image, deleteBlob])

  const onSubmit = async (value: InputTypeUpdateProfile) => await updateProfile(value)

  return (
    <Card className="bg-background mx-auto w-full max-w-lg shadow-none">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6 pb-6">
            <UploadImage
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              handleRemovePhoto={handleRemoveImage}
              currentImage={form.watch("image")}
              progress={progress}
              isUploading={isUploading}
              image_alt={dictionary.profile_image}
              image_header={dictionary.profile_image}
            />
            <InputField
              control={form.control}
              name="name"
              label={dictionary.name_label}
              placeholder={dictionary.name_placeholder}
              disabled={isLoading}
            />
            <div className="*:not-first:mt-2">
              <Label htmlFor={id}>Email</Label>
              <div className="flex rounded-md shadow-xs">
                <Input
                  id={id}
                  value={email}
                  className="-me-px flex-1 rounded-e-none shadow-none focus-visible:z-10"
                  placeholder={dictionary.email_placeholder}
                  type="email"
                />
                <EmailChangeForm email={email || ""}>
                  <button
                    type="button"
                    className="border-input bg-background text-foreground hover:bg-accent hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 inline-flex items-center rounded-e-md border px-3 text-sm font-medium transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {dictionary.change}
                  </button>
                </EmailChangeForm>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-3 pb-0">
            <Button type="submit" disabled={isLoading || isUploading}>
              {isLoading ? dictionary.please_wait : dictionary.save}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
