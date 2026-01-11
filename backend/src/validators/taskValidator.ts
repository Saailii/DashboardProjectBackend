import vine from '@vinejs/vine'

export const taskValidator = vine.object({
  name: vine.string(),
  description: vine.string(),
  status: vine.string(),
  projectId: vine.number().withoutDecimals(),   
  createdAt: vine.number(),
  updatedAt: vine.number(),
})

