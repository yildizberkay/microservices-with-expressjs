import { User } from '../db/models'
import { UserNotFound } from '../exceptions'

export const getUserById = async (id) => {
  const user = await User.findOne({ where: { id } })
  if (user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
  throw new UserNotFound()
}
