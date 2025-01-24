import * as z from "zod"

export const newPersona = z.object({
  name: z.string().min(1),
})

export const personaLinkedinSchema = z.object({
  linkedin: z.string().min(1),
})
