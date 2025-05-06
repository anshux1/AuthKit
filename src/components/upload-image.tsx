"use client"

import React from "react"
import Image from "next/image"
import { CircleUserRoundIcon, CloudUpload } from "lucide-react"
import { Button } from "~/components/ui/button"
import { useDictionary } from "~/store/language"

interface UploadAvatarSectionProps {
  currentImage?: string
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemovePhoto: () => void
  isUploading: boolean
  progress: number
  image_alt: string
  image_header: string
}

export function UploadImage({
  currentImage,
  fileInputRef,
  handleFileChange,
  handleRemovePhoto,
  isUploading,
  progress,
  image_alt,
  image_header,
}: UploadAvatarSectionProps) {
  const { dictionary } = useDictionary()
  return (
    <div className="flex gap-4">
      <div
        className="border-input hover:border-foreground/50 hover:bg-accent/50 relative flex size-20 items-center justify-center overflow-hidden rounded-sm border border-dashed transition-colors"
        role="button"
        onClick={() => fileInputRef.current?.click()}
        aria-label={currentImage ? dictionary.change_image : dictionary.upload_image}
      >
        {currentImage ? (
          <Image
            className="size-full object-cover"
            src={currentImage}
            alt={image_alt}
            width={128}
            height={128}
          />
        ) : (
          <CircleUserRoundIcon className="size-8 opacity-60" aria-hidden="true" />
        )}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="text-sm text-white">{progress}%</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <p className="text-sm">{image_header}</p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <CloudUpload className="mr-1 size-4" />
            {currentImage ? dictionary.change_image : dictionary.upload_image}
          </Button>
          {currentImage && (
            <Button size="sm" variant="outline" type="button" onClick={handleRemovePhoto}>
              {dictionary.remove_image}
            </Button>
          )}
        </div>
        <p className="text-muted-foreground text-xs">{dictionary.profile_image_size}</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="sr-only"
          aria-label={image_header}
        />
      </div>
    </div>
  )
}
