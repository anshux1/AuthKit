"use client"

import React, { useCallback, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { deleteBlob } from "~/action/azure"
import { createOrganization } from "~/action/organization"
import { createOrganizationSchema } from "~/action/organization/schema"
import { InputTypeCreateOrganization } from "~/action/organization/types"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { Input } from "~/components/ui/input"
import { useAction } from "~/hooks/useAction"
import { useFileUpload } from "~/hooks/useFileUpload"
import { useDictionary } from "~/store/language"
import { UploadImage } from "../upload-image"

interface OrganizationCreateFormProps {
  onboarding?: boolean
}

export function OrganizationCreateForm({
  onboarding = false,
}: OrganizationCreateFormProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { dictionary } = useDictionary()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const form = useForm<InputTypeCreateOrganization>({
    resolver: standardSchemaResolver(createOrganizationSchema),
    defaultValues: {
      name: "",
      image: "",
      slug: "",
      fromOnboarding: onboarding,
      currentPath: pathname,
    },
  })

  const { uploadFile, isUploading, progress } = useFileUpload({
    onSuccess: (data) => {
      form.setValue("image", data)
    },
  })
  const { execute, isLoading } = useAction(createOrganization, {
    onSuccess: (data) => router.push(`/${data.slug}/dashboard`),
    onError: toast.error,
  })

  const currentImage = useWatch({ control: form.control, name: "image" })

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      if (file.size > 2 * 1024 * 1024) return toast.error("File size exceeds 2MB")
      await uploadFile(file)
    },
    [uploadFile],
  )

  const handleRemovePhoto = useCallback(async () => {
    if (!currentImage) return
    await deleteBlob({ url: currentImage })
    form.setValue("image", "")
    if (fileInputRef.current) fileInputRef.current.value = ""
  }, [currentImage, form])

  const onSubmit = (value: InputTypeCreateOrganization) => execute(value)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UploadImage
          currentImage={currentImage}
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleRemovePhoto={handleRemovePhoto}
          image_alt={dictionary.organization_name_label}
          image_header={dictionary.organization_image_label}
          isUploading={isUploading}
          progress={progress}
          key="organization Image Upload"
        />
        <InputField
          control={form.control}
          name="name"
          label={dictionary.organization_name_label}
          placeholder={dictionary.organization_name_placeholder}
          disabled={isLoading}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dictionary.organization_URL}</FormLabel>
              <div className="flex rounded-md shadow-xs">
                <span className="border-input bg-background text-muted-foreground inline-flex items-center rounded-s-md border px-3 text-sm">
                  {dictionary.domain}/
                </span>
                <FormControl>
                  <Input
                    {...field}
                    className="-ms-px rounded-s-none shadow-none"
                    placeholder="google.com"
                    type="text"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={isLoading || isUploading}
          aria-disabled={isLoading || isUploading}
        >
          {isLoading ? dictionary.please_wait : dictionary.continue}
        </Button>
      </form>
    </Form>
  )
}
