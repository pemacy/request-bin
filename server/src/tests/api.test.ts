import { test, expect } from 'vitest'
import { v4 as uuidv4 } from 'uuid'
import request from 'supertest'
import app from '../app'
import pgClient from '../db/postgres/pgClient'
import WebhookPayload from '../models/WebhookPayload'
import { addMongoDoc } from '../controllers/controllerUtils'

// GET '/'
// get all bins - first time user (no session_id cookie)
test.skip('GET / - empty', async () => {
  const agent = request.agent(app)
  const res = await agent.get('/')
  expect(res.body.length).toBe(0)
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
  console.log("BINS:", res.body)
  expect(res.body.length).toBe(1)
})

// POST '/bins/new/:bin_id' - with session_id cookie
// createBin
test.skip('POST /bins/new/:bin_id - with session id cookie', async () => {
  const agent = request.agent(app)

  const session_id = uuidv4()
  const bin_id = 'abc123'

  await agent.post(`/bins/${bin_id}`).set('Cookie', `session_id=${session_id}`)

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

  const res = await agent.post('/bins/' + bin_id)

  const queryResult = await pgClient.query('SELECT * FROM bins')
  const bins = queryResult.rows
  expect(bins.length).toBe(1)
  const bin = bins[0]
  expect(bin.id).toBe(bin_id)
})

// post '/:bin_id/'
// createRecord
test.skip('POST /:bin_id - create record', async () => {
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

// get all records
test('GET /:bin_id/records', async () => {
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
  const recordWithDoc = await addMongoDoc(pgRecord)
  console.log('RETURNED RECORD FROM INSERT OPERTATION:', pgRecord)
  console.log("RECORD WITH DOC:", recordWithDoc)

  const res = await agent.get(`/${bin_id}/records`)
  console.log(res.body)
  expect(res.body)

})

test.skip('createTestRecord function', async () => {
  const record = await createTestRecord()
  const allBins = await getTestBins()
  expect(record.bin_id).toBe(allBins[0].id)
})

// delete a bin
test.skip('DELETE /bins/:bin_id', async () => {
  const agent = request.agent(app)

  const bin = await createTestBin()
  await createTestRecord(bin.id)
  await createTestRecord(bin.id)
  await createTestRecord(bin.id)

  let docCount = await WebhookPayload.countDocuments()
  expect(docCount).toBe(3)

  await agent.delete(`/bins/${bin.id}`)

  docCount = await WebhookPayload.countDocuments()
  expect(docCount).toBe(0)
})

// delete all bins
test.skip('DELETE /bins', async () => {
  const agent = request.agent(app)

  await createTestBin()
  await createTestBin()
  await createTestBin()

  const deletedBinsRes = await agent.delete('/bins')
  const deletedBins = deletedBinsRes.body
  expect(deletedBins.length).toBe(3)

  const query = 'SELECT * FROM bins'
  const result = await pgClient.query(query)
  expect(result.rows.length).toBe(0)
})


test.skip('DELETE /bins/:bin_id/records', async () => {
  const agent = request.agent(app)

  const bin = await createTestBin()

  await createTestRecord(bin.id)
  await createTestRecord(bin.id)
  await createTestRecord(bin.id)
  await createTestRecord(bin.id)

  let records = await getAllBinRecords(bin.id)
  expect(records.length).toBe(4)

  await agent.delete('/bins/' + bin.id)

  records = await getAllBinRecords(bin.id)
  expect(records.length).toBe(0)
})

const getAllBinRecords = async (bin_id: string) => {
  const query = 'SELECT * FROM records WHERE bin_id = $1'
  const result = await pgClient.query(query, [bin_id])
  return result.rows

}

const createTestBin = async () => {
  const session_id = uuidv4()
  const bin_id = uuidv4()

  const createBinQuery = 'INSERT INTO bins (id, session_id) VALUES ($1, $2) RETURNING *'
  const createBinValues = [bin_id, session_id]
  const binResult = await pgClient.query(createBinQuery, createBinValues)
  const bin = binResult.rows[0]
  return bin
}

const getTestBins = async () => {
  const query = 'SELECT * FROM bins'
  const result = await pgClient.query(query)
  return result.rows
}

const createTestRecord = async (bin_id: string | null = null) => {
  if (bin_id === null) {
    const bin = await createTestBin()
    bin_id = bin.id
  }

  const payload = { a: 1 }
  const recordDocModel = new WebhookPayload({ payload })
  const recordDocMongo = await recordDocModel.save()
  const mongoRecord = recordDocMongo.toJSON()

  const query = 'INSERT INTO records (method, bin_id, mongo_doc_id) VALUES ($1, $2, $3) RETURNING *'
  const values = ['POST', bin_id, mongoRecord.id]
  const queryResult = await pgClient.query(query, values)
  const record = queryResult.rows[0]

  return record
}
