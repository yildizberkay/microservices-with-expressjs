// @flow
import { connection } from '../config'

const DataTypes = require('sequelize')

const Ticket = connection.define('ticket', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'tickets'
})

export { Ticket }
