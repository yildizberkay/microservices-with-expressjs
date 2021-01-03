import { initializeDatabase } from './db'
const app = require('./server')

const port = 3000

app.listen(port, async () => {
  await initializeDatabase()
  console.log(`Auth service listening at http://localhost:${port}`)
})
