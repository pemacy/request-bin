import { test, expect } from 'vitest'
import pgClient from "../../db/postgres/pgClient";
import gitHubResponse from '../fixtures/githubResponse';
import GitHubPayload from '../../models/GitHubPayload';

const getAll = async (tableName: string) => {
  const query = 'SELECT * FROM ' + tableName
  const result = await pgClient.query(query)
  return result
}

const createSession = async () => {
  const sessions = await getAll('sessions')

  if (sessions.rowCount && sessions.rowCount > 0) {
    return sessions.rows[0]
  }

  const sessionId = 'session_abc123'
  const query = "INSERT INTO sessions (id) VALUES ($1) RETURNING *"
  const session = await pgClient.query(query, [sessionId])
  return session.rows[0]
}

const createBin = async () => {
  const bins = await getAll('sessions')

  if (bins.rowCount && bins.rowCount > 0) {
    return bins.rows[0]
  }

  const session = await createSession()
  const sessionId = session.id
  const binId = 'bin_abc123'
  const createdAt = new Date()
  const query = "INSERT INTO bins (id, session_id, created_at) VALUES ($1, $2, $3) RETURNING *"
  const bin = await pgClient.query(query, [binId, sessionId, createdAt])
  return bin.rows[0]
}

const createRequest = async () => {
  const bin = await createBin()
  const binId = bin.id
  const createdAt = new Date()
  const path = gitHubResponse.path
  const method = gitHubResponse.method
  const payload = JSON.parse(gitHubResponse.body)

  const doc = new GitHubPayload({ payload })
  const mongoDoc = await doc.save()
  const mongoJson = mongoDoc.toJSON()
  const mongoId = mongoJson.id

  const query = "INSERT INTO requests (method, path, bin_id, created_at, mongo_doc_id) VALUES ($1, $2, $3, $4, $5) RETURNING *"
  const values = [method, path, binId, createdAt, mongoId]
  const request = await pgClient.query(query, values)
  return request.rows[0]
}

test.skip('Insert data into sessions table', async () => {
  await createSession()
  const sessions = await getAll('sessions')
  expect(sessions.rowCount).toBe(1)
})

test.skip('Creates a bin', async () => {
  await createBin()
  const allBins = await getAll('bins')
  expect(allBins.rowCount).toBe(1)
})

test.skip('Creates a request', async () => {
  await createRequest()
  const allRequests = await getAll('requests')
  expect(allRequests.rowCount).toBe(1)
})
