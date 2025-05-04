import { env } from "~/env"
import { CreateEmailResponseSuccess } from "resend"
import { resend } from "~/services/resend"

export async function sendEmail({
  from = env.RESEND_FROM_EMAIL || "Ansh <no-reply@anshux1.me>",
  to,
  subject,
  react,
}: {
  from?: string
  to: string
  subject: string
  react: React.ReactElement
}): Promise<{ data?: CreateEmailResponseSuccess; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      subject,
      react,
    })
    if (error || !data?.id) return { error: error?.message }
    return { data }
  } catch (err) {
    return {
      error: err instanceof Error ? err.message : "Failed to send email.",
    }
  }
}
