import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    STRIPE_API_KEY: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().min(1),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().min(1),
    PRISMA_FIELD_ENCRYPTION_KEY: z.string().min(1),
    CRON_SECRET: z.string().min(1),
    POSTMARK_API_TOKEN: z.string().min(1),
    SMTP_FROM: z.string().min(1),
    TEMPLATE_ID: z.string().min(1),
    EMAIL_SERVER_HOST: z.string().min(1),
    EMAIL_SERVER_PORT: z.string().min(1),
    EMAIL_SERVER_USER: z.string().min(1),
    EMAIL_SERVER_PASSWORD: z.string().min(1),
    PRISMA_FIELD_ENCRYPTION_KEY: z.string().min(1),
    BACKLINKER_SERVICE_SECRET: z.string().min(1),
    MOZ_USERNAME: z.string().min(1),
    MOZ_PASSWORD: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PLAN_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PLAN_ID: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    STRIPE_API_KEY: process.env.STRIPE_API_KEY,
    NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_STANDARD_MONTHLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_STANDARD_YEARLY_PLAN_ID,
    NEXT_PUBLIC_STRIPE_PERSONAL_MONTHLY_PLAN_ID:
      process.env.NEXT_PUBLIC_STRIPE_PERSONAL_MONTHLY_PLAN_ID,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    CRON_SECRET: process.env.CRON_SECRET,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    PRISMA_FIELD_ENCRYPTION_KEY: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
    POSTMARK_API_TOKEN: process.env.POSTMARK_API_TOKEN,
    SMTP_FROM: process.env.SMTP_FROM,
    TEMPLATE_ID: process.env.TEMPLATE_ID,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    PRISMA_FIELD_ENCRYPTION_KEY: process.env.PRISMA_FIELD_ENCRYPTION_KEY,
    BACKLINKER_SERVICE_SECRET: process.env.BACKLINKER_SERVICE_SECRET,
    MOZ_USERNAME: process.env.MOZ_USERNAME,
    MOZ_PASSWORD: process.env.MOZ_PASSWORD,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
})
