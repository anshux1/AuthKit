"use client"

import React, { useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema"
import { profileOnboarding } from "~/action/auth/onboarding"
import { profileOnboardingSchema } from "~/action/auth/onboarding/schema"
import { InputTypeProfileOnboarding } from "~/action/auth/onboarding/types"
import { deleteBlob } from "~/action/azure"
import { useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import { Form } from "~/components/ui/form"
import { InputField } from "~/components/ui/form-fields"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { cn } from "~/lib/utils"
import { useAction } from "~/hooks/useAction"
import { useFileUpload } from "~/hooks/useFileUpload"
import { useDictionary } from "~/store/language"
import { UploadImage } from "../upload-image"

interface ProfileOnboardingFormProps {
  email: string
  name: string
  image?: string
  className?: string
}

export function ProfileOnboardingForm({
  name,
  email,
  image,
  className,
}: ProfileOnboardingFormProps) {
  const router = useRouter()
  const { dictionary } = useDictionary()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const form = useForm<InputTypeProfileOnboarding>({
    resolver: standardSchemaResolver(profileOnboardingSchema),
    defaultValues: {
      name,
      image,
    },
  })

  const currentImage = useWatch({ control: form.control, name: "image" })

  const { uploadFile, isUploading, progress } = useFileUpload({
    onSuccess: (data) => {
      form.setValue("image", data)
    },
  })

  const { execute, isLoading } = useAction(profileOnboarding, {
    onSuccess: () => router.push("/onboarding/organization"),
    onError: (error) => toast.error(error),
  })

  const onSubmit = (value: InputTypeProfileOnboarding) => {
    execute(value)
  }

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

  const handleRemovePhoto = useCallback(async () => {
    if (currentImage && currentImage !== image) {
      await deleteBlob({ url: currentImage })
    }
    form.setValue("image", "")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [currentImage, form, image])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-3", className)}>
        <UploadImage
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          handleRemovePhoto={handleRemovePhoto}
          currentImage={currentImage}
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
        <div className="space-y-2">
          <Label>{dictionary.email_label}</Label>
          <div className="flex rounded-md shadow-xs">
            <Input
              placeholder={dictionary.email_placeholder}
              defaultValue={email}
              disabled
              type="email"
            />
          </div>
        </div>
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
