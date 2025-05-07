import { type AnyUseQueryOptions } from "@tanstack/react-query"
import { authClient } from "~/lib/auth/client"
import { Session } from "~/types/auth"
import { useAuthQuery } from "./useAuthQuery"

export function useListSessions(options?: Partial<AnyUseQueryOptions>) {
  return useAuthQuery<Session[]>({
    queryKey: ["list-sessions"],
    queryFn: authClient.listSessions,
    options,
  })
}
