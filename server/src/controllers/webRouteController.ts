import { Request, Response } from 'express'
import WebhookPayload from '../models/WebhookPayload'
import pgClient from '../db/postgres/pgClient'
import { v4 as uuidv4 } from 'uuid'
import * as utils from './controllerUtils'

const MS_IN_HOUR = 60 * 60 * 1000
const MS_IN_DAY = MS_IN_HOUR * 24
const MS_IN_WEEK = MS_IN_DAY * 7
const MS_IN_MONTH = MS_IN_DAY * 30

// GET '/'
export const getBins = async (req: Request, res: Response) => {
  if (req.cookies.session_id) {
    console.log('SESSION ID:', req.cookies.session_id)
    const sessionId = req.cookies.session_id
    const query = 'SELECT * FROM bins WHERE session_id = $1'
    const values = [sessionId]
    const bins = await pgClient.query(query, values)
    console.log(query, '- VALUES:', values)
    res.json(bins.rows)
  } else {
    const sessionId = uuidv4()
    res.set('Set-Cookie', `session_id=${sessionId} max-age=${MS_IN_MONTH} httpOnly=true`)
    res.json([])
  }
}

// GET '/bins/:bin_id'
export const getBin = async (req: Request, res: Response) => {
  const bin_id = req.params.bin_id
  const query = 'SELECT * FROM bins WHERE id = $1'
  const values = [bin_id]
  const queryResult = await pgClient.query(query, values)
  console.log(query, '- VALUES:', values)
  const bin = queryResult.rows[0]

  res.json(bin)
}

// GET '/:bin_id/records'
export const getRecords = async (req: Request, res: Response) => {
  const bin_id = req.params.bin_id
  const query = 'SELECT * FROM records WHERE bin_id = $1'
  const values = [bin_id]
  const queryResult = await pgClient.query(query, values)
  console.log(query, '- VALUES:', values)
  const recordsWithDocs = await Promise.all(
    queryResult.rows.map(utils.addMongoDoc)
  )

  res.json(recordsWithDocs)
}

// POST '/:bin_id'
// POST '/bins/:bin_id/records'
export const createRecord = async (req: Request, res: Response) => {
  const payload = req.body
  const bin_id = req.params.bin_id
  const method = req.method
  const newPayload = new WebhookPayload({ payload })
  const savedPayload = await newPayload.save()
  const mongoDocId = savedPayload._id.toString()

  const query = 'INSERT INTO records (method, bin_id, mongo_doc_id) VALUES ($1, $2, $3) RETURNING *'
  const values = [method, bin_id, mongoDocId]
  const queryResult = await pgClient.query(query, values)
  console.log(query, '- VALUES:', values)
  const record = queryResult.rows[0]
  res.status(200).json(record)
}

// POST '/bins/new/:bin_id'
export const createBin = async (req: Request, res: Response) => {
  // request will have name of bin
  const bin_id = req.params.bin_id
  let session_id: string

  if (req.cookies.session_id) {
    session_id = req.cookies.session_id
  } else {
    session_id = uuidv4()
    res.cookie('session_id', session_id, {
      maxAge: MS_IN_MONTH,
      httpOnly: true,
    })
  }

  const query = "INSERT INTO bins (id, session_id) VALUES ($1, $2) RETURNING *"
  const values = [bin_id, session_id]
  const queryResult = await pgClient.query(query, values)
  console.log(query, '- VALUES:', values)
  const bin = queryResult.rows[0]
  res.status(200).json(bin)
}


// DETELE /bins/:bin_id/records/:record_id
export const deleteRecord = async (req: Request, res: Response) => {
  const binId = req.params.bin_id
  const recordId = req.params.record_id
  const query = 'DELETE FROM records WHERE bin_id = $1 AND id = $1 RETURNING *'
  const values = [binId, recordId]
  const result = await pgClient.query(query, values)
  console.log(query, '- VALUES:', values)
  const record = result.rows[0]
  res.json(record)
}

// DETELE /bins/:bin_id/records
export const deleteRecords = async (req: Request, res: Response) => {
  const query = 'DELETE FROM records RETURNING *'
  const result = await pgClient.query(query)
  const records = result.rows

  console.log(query, '- VALUES:')
  console.log("DELETED RECORDS:", records)

  await Promise.all(records.map(utils.deleteMongoDoc))
  res.json(records)
}

// DETELE /bins/:bin_id
export const deleteBin = async (req: Request, res: Response) => {
  const binId = req.params.bin_id
  let query = 'SELECT * FROM records WHERE bin_id = $1'
  const values = [binId]
  const recordsResult = await pgClient.query(query, [binId])
  const records = recordsResult.rows
  console.log(query, '- VALUES:', values)
  console.log("DELETED RECORDS:", records)

  query = 'DELETE FROM bins WHERE id = $1 RETURNING *'
  const result = await pgClient.query(query, [binId])
  const bin = result.rows[0]
  console.log(query, '- VALUES:', values)
  console.log("DELETED BIN:", bin)

  await Promise.all(records.map(utils.deleteMongoDoc))
  res.json(bin)
}

// DETELE /bins
export const deleteBins = async (req: Request, res: Response) => {
  const session_id = req.cookies.session_id

  // Get all bins with that session id
  let query = 'SELECT * FROM bins WHERE session_id = $1'
  const values = [session_id]
  const binsResult = await pgClient.query(query, values)
  let bins = binsResult.rows
  console.log(query, '- VALUES:', values)

  const recordArrays = await Promise.all(bins.map(utils.getBinRecords))
  const records = recordArrays.flat()
  await Promise.all(records.map(utils.deleteMongoDoc))

  query = 'DELETE FROM bins WHERE session_id = $1 RETURNING *'
  const deleteResult = await pgClient.query(query)
  bins = deleteResult.rows
  console.log(query, '- VALUES:', values)
  console.log("DELETED BINS:", bins)
  console.log("DELETED RECORDS:", records)

  const data = { bins, records }
  res.json(data)
}
