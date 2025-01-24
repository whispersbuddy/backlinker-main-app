import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import { ServerClient } from "postmark"

import { env } from "@/env.mjs"
import { db } from "@/lib/db"

import { logger } from "./logger"

const postmarkClient = new ServerClient(env.POSTMARK_API_TOKEN)

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db as any),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    EmailProvider({
      server: {
        host: env.EMAIL_SERVER_HOST,
        port: env.EMAIL_SERVER_PORT,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        console.log(url);
        const user = await db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
            name: true,
          },
        })

        const result = await postmarkClient.sendEmailWithTemplate({
          TemplateId: parseInt(env.TEMPLATE_ID),
          To: identifier,
          From: provider.from as string,
          TemplateModel: {
            name: user?.name || "there",
            action_url: url,
          },
          Headers: [
            {
              Name: "X-Entity-Ref-ID",
              Value: new Date().getTime() + "",
            },
          ],
        })

        if (result.ErrorCode) {
          console.log("ERROR ON EMAIL SEND")
          throw new Error(result.Message)
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.onboarded = token.onboarded
      }

      return session
    },
    async jwt({ token, user }) {
      const dbUser = await db.user.findFirst({
        where: {
          email: token.email,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          onboarded: true,
        },
      })

      if (!dbUser) {
        if (user) {
          token.id = user?.id
        }
        return token
      }

      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
        onboarded: dbUser.onboarded,
      }
    },
  },
  logger: {
    error: (code, metadata) => {
      logger.error(code, metadata)
    },
    warn: (code) => {
      logger.warn(code)
    },
    debug: (code, metadata) => {
      logger.debug(code, metadata)
    },
  },
}
