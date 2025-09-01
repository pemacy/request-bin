import { Request, Response } from 'express'
import WebhookPayload from '../models/WebhookPayload'
import pgClient from '../db/postgres/pgClient'
import { v4 as uuidv4 } from 'uuid'

const MS_IN_HOUR = 60 * 60 * 1000
const MS_IN_DAY = MS_IN_HOUR * 24
const MS_IN_WEEK = MS_IN_DAY * 7
const MS_IN_MONTH = MS_IN_DAY * 30

// GET '/'
export const getBins = async (req: Request, res: Response) => {
  console.log('COOKIES', req.cookies)
  if (req.cookies.session_id) {
    console.log('SESSION ID:', req.cookies.session_id)
    const sessionId = req.cookies.session_id
    const query = 'SELECT * FROM bins WHERE session_id = $1'
    const values = [sessionId]
    const bins = await pgClient.query(query, values)
    res.json({ bins: bins.rows })
  } else {
    const sessionId = uuidv4()
    res.set('Set-Cookie', `session_id=${sessionId} max-age=${MS_IN_MONTH} httpOnly=true`)
    res.json({ bins: [] })
  }
}

// POST '/bins/new/:bin_id'
export const createBin = async (req: Request, res: Response) => {
  // request will have name of bin
  const bin_id = req.params.bin_id
  let session_id: string
  console.log('COOKIES:', req.cookies)
  console.log('BIN ID:', bin_id)

  if (req.cookies.session_id) {
    session_id = req.cookies.session_id
  } else {
    session_id = uuidv4()
    res.cookie('session_id', session_id, {
      maxAge: MS_IN_MONTH,
      httpOnly: true,
    })
  }
  console.log('SESSION ID:', session_id)

  const query = "INSERT INTO bins (id, session_id) VALUES ($1, $2) RETURNING *"
  const values = [bin_id, session_id]
  const queryResult = await pgClient.query(query, values)
  const bin = queryResult.rows[0]
  res.status(200).json(bin)
}

// GET '/:bin_id/records'
export const getRecords = async (req: Request, res: Response) => {
  const bin_id = req.params.bin_id
  const query = 'SELECT * FROM records WHERE bin_id = $1'
  const queryResult = await pgClient.query(query, [bin_id])
  const recordsWithDocs = await Promise.all(
    queryResult.rows.map(addMongoDoc)
  )

  res.json(recordsWithDocs)
}

// POST '/:bin_id'
export const createRecord = async (req: Request, res: Response) => {
  console.log('=== CREATE RECORD CONTROLLER ===')

  const payload = req.body
  const bin_id = req.params.bin_id
  const method = req.method
  const newPayload = new WebhookPayload({ payload })
  const savedPayload = await newPayload.save()
  const mongoDocId = savedPayload._id.toString()

  const query = 'INSERT INTO records (method, bin_id, mongo_doc_id) VALUES ($1, $2, $3) RETURNING *'
  const values = [method, bin_id, mongoDocId]
  const queryResult = await pgClient.query(query, values)
  const record = queryResult.rows[0]
  console.log('Record Created')
  res.status(200).json(record)
}


// TESTING Controllers

// GET '/:bin_id/show'
export const testingShowRecords = async (req: Request, res: Response) => {
  const recordsWithDocs = await getRecords(req, res)
  res.render('showRecords', { req, recordsWithDocs })
}

export const testingShowBins = async (req: Request, res: Response) => {
  const records = await getBins(req, res)
  res.render('showBins', { req, records })
}

export const testingCreateBin = async (req: Request, res: Response) => {
  const records = await getBins(req, res)
  res.redirect('/testing/')
}

export const testingCreateRecord = async (req, res) => {
  const recrods = await getBins(req, res)
  res.render('showRecords', { req, recordsWithDocs })

}

// GET '/hello_world'
export const helloWorld = async (req: Request, res: Response) => {
  console.log("COOKIES:", req.cookies)
  console.log("HEADERS:", req.headers)
  if (req?.cookies?.hello) {
    res.send('hello cookie value: ' + req.cookies.hello)
  } else {
    res.cookie('hello', 'World')
    res.send('No hello cookie in request')
  }
}

// TYPES
interface RecordRow {
  id: number
  method: string
  bin_id: string
  created_at: Date
  mongo_doc_id: string | null
}

// UTILITY FUNCTIONS
const addMongoDoc = async (record: RecordRow) => {
  return WebhookPayload.findOne({ _id: record.mongo_doc_id })
}
