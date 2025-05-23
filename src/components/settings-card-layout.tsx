import React from "react"

interface SettingsCardLayoutProps {
  children: React.ReactNode
  title: string
  description: string
}
export const SettingsCardLayout = React.memo(
  ({ title, description, children }: SettingsCardLayoutProps) => {
    return (
      <div
        role="region"
        aria-label={title}
        className="flex w-full max-w-5xl flex-col gap-4 xl:flex-row"
      >
        <div className="w-full max-w-sm">
          <h3 className="mb-2 text-sm font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        <div className="mx-auto w-full max-w-lg">{children}</div>
      </div>
    )
  },
)

SettingsCardLayout.displayName = "SettingsCardLayout"
