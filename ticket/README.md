# Ticket Service

This service aims to manage tickets.

## Technical Brief
The service is built on the top of ExpressJS and Sequelize is used as ORM. While PostgreSQL is used as prod database, SQLite is preferred as test database.

Babel 7 is used to convert ECMAScript 2015+ code and Node target version is 14.

In the test side, Jest is used as the testing framework.

### Required Environment Variables
#### ACTIVE_ENV
Currently, only the database config is determined by this parameter. It takes the following values.
- production
- development
- test

*config.js*
```
export const configs = {
  development: {
    uri: process.env?.DEV_DB_URI ?? 'postgres://postgres:password@localhost:5432/dev_service_auth',
    logging: true
  },
  test: {
    uri: process.env?.TEST_DB_URI ?? 'sqlite::memory:',
    logging: false
  },
  production: {
    uri: process.env?.PROD_DB_URI ?? 'postgres://postgres:password@localhost:5432/service_auth',
    logging: false
  }
}
```

### PROD_DB_URI, DEV_DB_URI and TEST_DB_URI
These variables take database URI like followings.
```
postgres://postgres:password@db:5432/service_auth
sqlite::memory:
```

More samples: https://sequelize.org/master/manual/getting-started.html

### JWT_SALT
This is a secret key for JWT, keep it safe!

### Available NPM Commands

#### Test
Runs all tests using Jest.
```
npm run test
```

#### Build
Extracts a Node 14 compatible build folder using Babel.
```
npm run build
```

#### Server
Starts a server from /dist folder.
```
npm run server
```

### Folder Structure
```
- tests
- src
  - db
    - config
      # Holds database profiles and connection object. 
    - models
      # Holds Sequelize models.
  - enums
  - exceptions
  - middlewares
    # Middlewares like authHandler are held here.
  - services
    # Database related business logics are managed under this folder.
  - index.js
  - routes.js
  - server.js
```
