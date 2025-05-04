import { sendEmail } from "~/action/mail"
import { markEmailasVerified } from "~/action/user"
import { MagicLinkMail } from "~/emails/magic-link"
import ResetPaswordEmail from "~/emails/reset-password"
import VerificationEmail from "~/emails/verify-email"
import { env } from "~/env"
import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { nextCookies } from "better-auth/next-js"
import { magicLink, multiSession, openAPI, organization } from "better-auth/plugins"
import db from "~/db"
import { resend } from "~/services/resend"

export const auth = betterAuth({
  appName: "AuthKit",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ url, user }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify Your Email Address for CollabTube",
        react: ResetPaswordEmail({
          name: user.name,
          verificationUrl: url,
        }),
      })
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 600,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ url, user: { email, name } }) => {
      if (url.includes("/settings/profile?type=changeEmail")) {
        await markEmailasVerified({ email, name })
      } else {
        await sendEmail({
          to: email,
          subject: "Verify Your Email Address for CollabTube",
          react: VerificationEmail({
            name: name,
            verificationUrl: `${url}onboarding/profile`,
          }),
        })
      }
    },
  },
  socialProviders: {
    google: {
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      onboardingStatus: {
        type: "string",
        required: false,
        defaultValue: "pending",
      },
      onboardingStep: {
        type: "string",
        required: false,
        defaultValue: "profile",
      },
    },
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url, newEmail }) => {
        console.log("url 2", url)
        await sendEmail({
          to: newEmail,
          subject: "Verify Your Email Address for CollabTube",
          react: VerificationEmail({
            name: user.name,
            verificationUrl: `${url}settings/profile?type=changeEmail`,
          }),
        })
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password", "dropbox"],
    },
  },
  rateLimit: {
    storage: "database",
    modelName: "ratelimit",
  },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        const result = await resend.emails.send({
          from: env.RESEND_FROM_EMAIL,
          to: email,
          subject: `Magic Login Link from CollabTube!`,
          react: MagicLinkMail({
            email: email,
            magicLink: url,
          }),
        })
        if (result.error) {
          console.error(result.error)
          throw new Error(result.error?.message)
        }
      },
    }),
    nextCookies(),
    organization(),
    multiSession(),
    openAPI(),
  ],
})
