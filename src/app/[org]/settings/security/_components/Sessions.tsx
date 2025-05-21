import React from "react"
import { headers } from "next/headers"
import { Card, CardContent } from "~/components/ui/card"
import { auth } from "~/lib/auth"
import { SessionCell } from "./SessionCell"

export const Sessions = async () => {
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  })
  return (
    <Card className="shadow-none">
      <CardContent className="space-y-6 pb-6">
        {sessions?.map((session) => <SessionCell key={session.id} session={session} />)}
      </CardContent>
    </Card>
  )
}
