import vine from '@vinejs/vine'

export const projectSchema = vine.object({
  name: vine.string(),
  status: vine.string(),
  createdAt: vine.number(),
  updatedAt: vine.number(),
})

