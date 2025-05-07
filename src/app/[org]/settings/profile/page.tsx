import React from "react"
import { redirect } from "next/navigation"
import { Separator } from "~/components/ui/separator"
import { getSession } from "~/data/auth"
import { ProfileImageUpdate } from "./_components/ProfileImageUpdate"
import { ProfileNameForm } from "./_components/ProfileNameUpdate"

export default async function page() {
  const { ctx } = await getSession()
  if (!ctx?.user) redirect("/login")
  return (
    <div>
      <h1 className="mb-2 text-2xl font-semibold">My Profile</h1>
      <Separator />
      <ProfileImageUpdate className="my-5" image={ctx.user.image || ""} />
      <ProfileNameForm name={ctx.user.name} />
    </div>
  )
}
