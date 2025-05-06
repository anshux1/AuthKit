import { headers as nextHeaders } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { auth } from "./lib/auth"
import { routes } from "./lib/auth/routes"

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const pathname = nextUrl.pathname

  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next()
  }

  const headers = await nextHeaders()
  const [session, orgs] = await Promise.all([
    auth.api.getSession({ headers }),
    auth.api.listOrganizations({ headers }),
  ])

  const isAuthenticated = !!session?.session
  const isPublicRoute = routes.publicRoutes.includes(pathname)
  const isAuthRoute = routes.authRoutes.includes(pathname)

  if (isAuthenticated) {
    const onboardingStep = session?.user.onboardingStep
    const onboardingStatus = session?.user.onboardingStatus

    if (onboardingStatus === "completed" && pathname.startsWith("/onboarding")) {
      if (!orgs.length) {
        return NextResponse.redirect(new URL("/join", request.nextUrl))
      } else {
        return NextResponse.redirect(
          new URL(`/${orgs[0].slug}/dashboard`, request.nextUrl),
        )
      }
    }

    if (onboardingStatus === "pending" && pathname !== `/onboarding/${onboardingStep}`) {
      return NextResponse.redirect(new URL(`/onboarding/${onboardingStep}`, nextUrl))
    }

    if (!orgs.length && pathname !== "/join" && !pathname.startsWith("/onboarding/")) {
      return NextResponse.redirect(new URL("/join", request.nextUrl))
    }

    if ((isPublicRoute || isAuthRoute) && orgs.length && onboardingStatus !== "pending") {
      return NextResponse.redirect(new URL(`/${orgs[0].slug}/dashboard`, request.nextUrl))
    }

    return NextResponse.next()
  }

  if (isPublicRoute || isAuthRoute) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL("/auth/sign-in", request.nextUrl))
}

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
