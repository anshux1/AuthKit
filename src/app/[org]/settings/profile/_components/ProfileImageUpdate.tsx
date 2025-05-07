"use client"

import React, { useCallback, useRef, useState } from "react"
import { deleteBlob } from "~/action/azure"
import { toast } from "sonner"
import { UploadImage } from "~/components/upload-image"
import { authClient } from "~/lib/auth/client"
import { useFileUpload } from "~/hooks/useFileUpload"
import { useDictionary } from "~/store/language"

interface ProfileImageUpdateProps {
  image?: string
  className?: string
}

export function ProfileImageUpdate({ image }: ProfileImageUpdateProps) {
  const { dictionary } = useDictionary()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [currentImage, setCurrentImage] = useState(() => image)
  const { uploadFile, isUploading, progress } = useFileUpload({
    onSuccess: async (url) => {
      if (url === currentImage) return
      const { data } = await authClient.updateUser({ image: url })
      if (data?.status) {
        toast(dictionary.profile_image_change_success)
        setCurrentImage(url)
      } else {
        toast.error(dictionary.profile_image_change_error)
      }
    },
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

  const handleRemovePhoto = useCallback(async () => {
    if (currentImage && currentImage !== image) {
      await deleteBlob({ url: currentImage })
    }
    setCurrentImage(undefined)
    await authClient.updateUser({ image: undefined })
  }, [currentImage, image])

  return (
    <UploadImage
      className="my-5"
      fileInputRef={fileInputRef}
      handleFileChange={handleFileChange}
      handleRemovePhoto={handleRemovePhoto}
      currentImage={currentImage}
      progress={progress}
      isUploading={isUploading}
      image_alt={dictionary.profile_image}
      image_header={dictionary.profile_image}
    />
  )
}
