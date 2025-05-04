import * as React from "react"
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components"

interface ResetPassworkEmailProps {
  name: string
  verificationUrl: string
}

export const ResetPaswordEmail = ({ name, verificationUrl }: ResetPassworkEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="m-auto bg-white px-2 font-sans">
          <Preview>Reset Your Password - CollabTube</Preview>
          <Container className="mx-auto my-[20px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[20px] p-0 text-center text-[24px] font-semibold text-black">
              Reset Your Password
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">Hello {name},</Text>
            <Text className="text-[14px] leading-[24px] text-black">
              We received a request to reset your password. If you made this request,
              please click the button below to choose a new password:
            </Text>
            <Section className="my-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={verificationUrl}
              >
                Reset Password
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Link href={verificationUrl}>{verificationUrl}</Link>
            <Text className="text-[14px] leading-[24px] text-black">
              If you didn’t request a password reset, you can safely ignore this email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ResetPaswordEmail.PreviewProps = {
  name: "Alan Turing",
  verificationUrl: "https://avatars.githubusercontent.com/u/18133?v=4",
  userImage: "https://avatars.githubusercontent.com/u/18133?v=4",
} as ResetPassworkEmailProps

export default ResetPaswordEmail
