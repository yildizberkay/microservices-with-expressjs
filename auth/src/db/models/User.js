// @flow
import { connection } from '../config'

const DataTypes = require('sequelize')

const User = connection.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isAlphanumeric: true,
      len: [2, 255]
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users'
})

export { User }
