import * as z from "zod"

export const userOnboardingSchema = z.object({
  onboarded: z.boolean(),
})

export const newUserSchema = z.object({
  email: z.string().email(),
})

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
})

export const userBioSchema = z.object({
  bio: z.string().min(50),
})

export const userWebsiteSchema = z.object({
  website: z.string().url(),
})

export const userConnectivelySchema = z.object({
  connectivelyUsername: z.string().min(1),
  connectivelyPassword: z.string().min(1),
})

export const decryptPwSchema = z.object({
  password: z.string().min(1),
})
