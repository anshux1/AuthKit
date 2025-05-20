import React from "react"

interface SettingsCardLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}

export function SettingsCardLayout({
  title,
  description,
  children,
}: SettingsCardLayoutProps) {
  return (
    <div className="flex w-full max-w-5xl flex-col gap-4 xl:flex-row">
      <div className="mx-auto w-full max-w-lg">
        <h1 className="mb-2 text-sm font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
      <div className="mx-auto w-full max-w-lg">{children}</div>
    </div>
  )
}
