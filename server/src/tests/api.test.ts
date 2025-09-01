import { test, expect } from 'vitest'
import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'
import app from '../app'
import pgClient from '../db/postgres/pgClient'
import WebhookPayload from '../models/WebhookPayload'

// GET '/'
// get all bins - first time user (no session_id cookie)
test.skip('GET / - empty', async () => {
  const agent = request.agent(app)
  const res = await agent.get('/')
  expect(res.body.bins.length).toBe(0)
})

// GET '/'
// get all bins - returning user (with session_id cookie)
test.skip('GET / - not empty', async () => {
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

  const res = await agent.get('/').set('Cookie', `session_id=${session_id}`)
  console.log("BINS:", res.body.bins)
  expect(res.body.bins.length).toBe(1)
})

// POST '/bins/new/:bin_id' - with session_id cookie
// createBin
test.skip('POST /bins/new/:bin_id - with session id cookie', async () => {
  const agent = request.agent(app)

  const session_id = uuidv4()
  const bin_id = 'abc123'

  await agent.post(`/bins/new/${bin_id}`).set('Cookie', `session_id=${session_id}`)

  const queryResult = await pgClient.query('SELECT * FROM bins')
  const bins = queryResult.rows
  expect(bins.length).toBe(1)
  const bin = bins[0]
  expect(bin.id).toBe(bin_id)
  expect(bin.session_id).toBe(session_id)
})

// POST '/bins/new/:bin_id - without session_id cookie'
// createBin
test.skip('POST /:bin_id - without session id cookie', async () => {
  const agent = request.agent(app)

  const bin_id = 'abc123'

  const res = await agent.post('/bins/new/' + bin_id)

  const queryResult = await pgClient.query('SELECT * FROM bins')
  const bins = queryResult.rows
  expect(bins.length).toBe(1)
  const bin = bins[0]
  expect(bin.id).toBe(bin_id)
})

// post '/:bin_id/'
// createRecord
test('POST /:bin_id - create record', async () => {
  const agent = request.agent(app)

  const session_id = uuidv4()
  const bin_id = 'abc123'

  const createBinQuery = 'INSERT INTO bins (id, session_id) VALUES ($1, $2)'
  const createBinValues = [bin_id, session_id]
  await pgClient.query(createBinQuery, createBinValues)

  const payload = { a: 1 }
  await agent.post(`/${bin_id}`).send(payload).set('Content-Type', 'application/json')

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

  const docCount = await WebhookPayload.countDocuments()
  expect(docCount).toBe(1)

  const mongoResult = await WebhookPayload.findOne({})
  const mongoDoc = mongoResult?.toJSON()

  if (mongoDoc === undefined) throw new Error('Mongo Doc undefined')
  expect(mongoDoc.id).toBe(record.mongo_doc_id)
  expect(mongoDoc.payload?.a).toBe(1)

  expect(record.method).toBe('POST')
  expect(record.bin_id).toBe('abc123')
})

test.skip('GET /:bin_id/records', async () => {
  const agent = request.agent(app)

  const session_id = uuidv4()
  const bin_id = 'abc123'

  const createBinQuery = 'INSERT INTO bins (id, session_id) VALUES ($1, $2)'
  const createBinValues = [bin_id, session_id]
  await pgClient.query(createBinQuery, createBinValues)

  const payload = { a: 1 }
  const recordDocModel = new WebhookPayload({ payload })
  const recordDocMongo = await recordDocModel.save()
  const mongoRecord = recordDocMongo.toJSON()

  const query = 'INSERT INTO records (method, bin_id, mongo_doc_id) VALUES ($1, $2, $3) RETURNING *'
  const values = ['POST', bin_id, mongoRecord.id]
  const queryResult = await pgClient.query(query, values)
  const pgRecord = queryResult.rows[0]
  console.log('RETURNED RECORD FROM INSERT OPERTATION:', pgRecord)

  const res = await agent.get(`/${bin_id}/records`)
  console.log(res.body)
  expect(res.body)

})

