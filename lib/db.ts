import * as crypto from "crypto"
import { PrismaClient } from "@prisma/client"

import { env } from "@/env.mjs"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma

const ENCRYPTION_KEY = env.PRISMA_FIELD_ENCRYPTION_KEY
const IV_LENGTH = 16 // For AES, this is always 16

export function encrypt(text: string) {
  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    )
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return iv.toString("hex") + ":" + encrypted.toString("hex")
  } catch (err) {
    console.log(err)
  }
}

// Function to decrypt data
export function decrypt(encryptedText: string) {
  try {
    const textParts = encryptedText.split(":")
    const iv = Buffer.from(textParts[0], "hex")
    const encryptedData = Buffer.from(textParts[1], "hex")

    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      Buffer.from(ENCRYPTION_KEY),
      iv
    )

    let decrypted = decipher.update(encryptedData)
    decrypted = Buffer.concat([decrypted, decipher.final()])

    return decrypted.toString()
  } catch (err) {
    console.error(err)
  }
}