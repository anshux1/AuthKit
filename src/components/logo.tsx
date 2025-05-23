import React from "react"
import Link from "next/link"
import { SquareKanban } from "lucide-react"
import { cn } from "~/lib/utils"
import { getDictionary } from "~/utils/dictonaries"

export async function Logo({ onlyImage = false }: { onlyImage?: boolean }) {
  const { app_name } = await getDictionary()
  return (
    <Link href="/" className={cn("flex items-center gap-2")}>
      <SquareKanban className="size-12 rotate-180 stroke-[1.5px]" />
      {!onlyImage && <h1 className="text-4xl font-bold tracking-tight">{app_name}</h1>}
    </Link>
  )
}
