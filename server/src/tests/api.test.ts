import { test, expect } from 'vitest'
import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'
import app from '../app'
import gitHubPayload from './fixtures/gitHubPayload'
import pgClient from '../db/postgres/pgClient'
import GitHubPayload from '../models/GitHubPayload'

test.skip('GET /hello_world - client sets a cookie', async () => {
  const agent = request.agent(app)
  const res = await agent.get('/hello_world').set("Cookie", "hello=World")

  expect(res.statusCode).toBe(200)
  expect(res.text).toBe('hello cookie set: World')
})

test.skip('GET /hello_world - server sets a cookie', async () => {
  const agent = request.agent(app)
  let res = await agent.get('/hello_world')
  console.log("RESPONSE HEADERS:", res.headers)
  expect(res.text).toBe('No hello cookie in request')
  console.log(res.headers)

  res = await agent.get('/hello_world').set("Cookie", "hello=World")
  expect(res.text).toBe('hello cookie value: World')

  res = await agent.get('/hello_world')
  expect(res.text).toBe('hello cookie value: World')
  console.log(res.request.cookies)
})

test.skip('GET /bins - empty', async () => {
  const agent = request.agent(app)
  const res = await agent.get('/bins')
  expect(res.body.bins.length).toBe(0)
})

test.skip('GET /bins - not empty', async () => {
  const agent = request.agent(app)

  const session_id = uuidv4()
  const bin_id = 'abc123'
  console.log(session_id, typeof session_id)

  const query = 'INSERT INTO bins (id, session_id) VALUES ($1, $2) RETURNING *'
  const values = [bin_id, session_id]
  await pgClient.query(query, values)

  let result = await pgClient.query('SELECT * FROM bins;')
  const allBins = result.rows
  expect(allBins.length).toBe(1)

  const res = await agent.get('/bins').set('Cookie', `session_id=${session_id}`)
  console.log("BINS:", res.body.bins)
  expect(res.body.bins.length).toBe(1)
})

test.skip('POST /bins/new/:id - with session id', async () => {
  const agent = request.agent(app)

  const session_id = uuidv4()
  const bin_id = 'abc123'

  const res = await agent.post('/bins/new/' + bin_id).set('Cookie', `session_id=${session_id}`)

  const queryResult = await pgClient.query('SELECT * FROM bins')
  const bins = queryResult.rows
  expect(bins.length).toBe(1)
  const bin = bins[0]
  expect(bin.id).toBe(bin_id)
  expect(bin.session_id).toBe(session_id)
})

test('POST /bins/new/:id - without session id', async () => {
  const agent = request.agent(app)

  const bin_id = 'abc123'

  const res = await agent.post('/bins/new/' + bin_id)

  const queryResult = await pgClient.query('SELECT * FROM bins')
  const bins = queryResult.rows
  expect(bins.length).toBe(1)
  const bin = bins[0]
  expect(bin.id).toBe(bin_id)
})

test('POST /:bin_id - create request', async () => {
  const agent = request.agent(app)

  const session_id = uuidv4()
  const bin_id = 'abc123'

  const createBinQuery = 'INSERT INTO bins (id, session_id) VALUES ($1, $2)'
  const createBinValues = [bin_id, session_id]
  await pgClient.query(createBinQuery, createBinValues)

  const payload = { a: 1 }
  await agent.post('/' + bin_id).send(payload).set('Content-Type', 'application/json')

  const allBinsQuery = await pgClient.query('SELECT * FROM bins')
  const allBins = allBinsQuery.rows

  const allRecordsQuery = await pgClient.query('SELECT * FROM records')
  const allRecords = allRecordsQuery.rows

  const allBinRecordsQuery = await pgClient.query('SELECT * FROM records WHERE bin_id = $1', [bin_id])
  const binRecords = allBinRecordsQuery.rows
  const record = binRecords[0]

  console.log('=== Create Record Stats ===')
  console.log('ALL BINS:', allBins)
  console.log('BIN RECORDS', binRecords)
  console.log('ALL RECORDS:', allRecords)
  console.log('RECORD:', record)

  const docCount = await GitHubPayload.countDocuments()
  expect(docCount).toBe(1)

  const mongoResult = await GitHubPayload.findOne({})
  const mongoDoc = mongoResult?.toJSON()

  if (mongoDoc === undefined) throw new Error('Mongo Doc undefined')
  expect(mongoDoc.id).toBe(record.mongo_doc_id)
  expect(mongoDoc.payload?.a).toBe(1)

  expect(record.method).toBe('POST')
  expect(record.bin_id).toBe('abc123')
})
