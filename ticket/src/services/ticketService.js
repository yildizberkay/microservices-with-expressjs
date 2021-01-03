// @flow
import { Ticket } from '../db/models'
import { UserIdShouldProvided } from '../exceptions/UserIdShouldProvided'

export const getTicket = async (userId: string, id?: string) => {
  if (!userId) {
    throw new UserIdShouldProvided()
  }
  if (id) {
    return Ticket.findOne({ where: { userId, id } })
  }
  return Ticket.findAll({ where: { userId } })
}

export const createTicket = async (title: string, content: string, userId: number) => {
  const postObject = Ticket.build({ title, content, userId })
  await postObject.validate()
  await postObject.save()
  return {
    id: postObject.id,
    title: postObject.title,
    content: postObject.content,
    userId: parseInt(postObject.userId)
  }
}
