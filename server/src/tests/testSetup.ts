import { beforeAll, afterEach, afterAll } from 'vitest'
import mongoose from 'mongoose'
import pgClient from '../db/postgres/pgClient'
import connectMongoDB from '../db/mongodb/connectMongoDB'
import GitHubPayload from '../models/GitHubPayload'

beforeAll(async () => {
  await pgClient.connect().then(() => {
    console.log('Connected to Postgres database:', pgClient.database)
  })
  await connectMongoDB()
  console.log('Connected to Mongo database:', process.env.MONGO_URL)
})

afterEach(async () => {
  const deleteBinsQuery = "DELETE FROM bins;"
  const deleteRequestsQuery = "DELETE FROM records;"
  await pgClient.query(deleteBinsQuery)
  await pgClient.query(deleteRequestsQuery)

  await GitHubPayload.deleteMany({})
  console.log('After Each: All Postgre and Mongo entries deleted')
})

afterAll(async () => {
  console.log('Tests complete')
  await pgClient.end()
  console.log('Postgres database disconnected')
  await mongoose.connection.close()
  console.log('Mongo database disconnected')
})
