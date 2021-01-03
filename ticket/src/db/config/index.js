import { configs } from './config'

const { Sequelize } = require('sequelize')

const activeConfig = configs[process.env?.ACTIVE_ENV]
export const connection = new Sequelize(activeConfig.uri, { logging: activeConfig.logging })
