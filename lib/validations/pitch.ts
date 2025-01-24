import * as z from "zod"

export const newPitchSchema = z.object({
  querySummary: z.string().min(1),
  queryRequirements: z.string().min(1),
  subject: z.string().min(1),
  content: z.string().min(1),
})
