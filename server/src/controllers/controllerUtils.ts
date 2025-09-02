import { Request, Response } from 'express'
import WebhookPayload from '../models/WebhookPayload'
import pgClient from '../db/postgres/pgClient'
import { v4 as uuidv4 } from 'uuid'

interface Record {
  mongo_doc_id: string;
}

export const deleteMongoDoc = async (record: Record) => {
  const docId = record.mongo_doc_id
  const result = await WebhookPayload.deleteOne({ _id: docId })
  console.log("DELETE MONGO DOC RESULT", result)
  return result
}

interface Bin {
  id: string,
  session_id: string,
  created_at: Date
}

export const getBinRecords = async (bin: Bin) => {
  const query = 'SELECT * FROM records WHERE bin_id = $1'
  const result = await pgClient.query(query, [bin.id])
  const records = result.rows
  return records
}

interface RecordRow {
  id: number
  method: string
  bin_id: string
  created_at: Date
  mongo_doc_id: string | null
}

export const addMongoDoc = async (record: RecordRow) => {
  return WebhookPayload.findOne({ _id: record.mongo_doc_id })
}
