import app from './app'
import connectMongoDB from './db/mongodb/connectMongoDB'
import pgClient = require('./db/postgres/pgClient')

const PORT = process.env.PORT || 3000

connectMongoDB()
pgClient.connect().then(() => {
  console.log('Postgres DB connected:', pgClient.database)
})

app.listen(PORT, () => {
  console.log('Request Bin server started on port', PORT)
})
