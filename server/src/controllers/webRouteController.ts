import { Request, Response } from 'express'
import GitHubPayload from '../models/GitHubPayload'
import pgClient from '../db/postgres/pgClient'
import { v4 as uuidv4 } from 'uuid'

const MS_IN_HOUR = 60 * 60 * 1000
const MS_IN_DAY = MS_IN_HOUR * 24
const MS_IN_WEEK = MS_IN_DAY * 7
const MS_IN_MONTH = MS_IN_DAY * 30

export const showBin = async (req: Request, res: Response) => {
  res.render('bins', res)
}

export const main = async (req: Request, res: Response) => {
  console.log('PAYLOAD:', req.body)
  console.log('PATH:', req.path)
  console.log('METHOD:', req.method)
  console.log('URL:', req.url)
  console.log('BASE URL:', req.baseUrl)
  console.log('ORIGINAL URL:', req.originalUrl)
  res.send('<h1>Hello</h1>')
}

export const createBin = async (req: Request, res: Response) => {
  // request will have name of bin
  const bin_id = req.params.id
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

  const query = "INSERT INTO bins (id, session_id) VALUES ($1, $2)"
  const values = [bin_id, session_id]
  try {
    await pgClient.query(query, values)
    res.status(200).send()
  } catch (err) {
    console.log("A Postgres Error occured", err)
    res.status(400).send()
  }
}

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
    res.json({ bins: [] })
  }
}

export const getRecords = async (req: Request, res: Response) => {
}

export const createRecord = async (req: Request, res: Response) => {
  console.log('=== CREATE RECORD CONTROLLER ===')

  const payload = req.body
  const bin_id = req.params.bin_id
  const method = req.method
  const newPayload = new GitHubPayload({ payload })
  const savedPayload = await newPayload.save()
  const mongoDocId = savedPayload._id.toString()

  const query = 'INSERT INTO records (method, bin_id, mongo_doc_id) VALUES ($1, $2, $3) RETURNING *'
  const values = [method, bin_id, mongoDocId]
  await pgClient.query(query, values)
  console.log('Record Created')
  res.status(200).send()
}

// Path for testing cookies
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
