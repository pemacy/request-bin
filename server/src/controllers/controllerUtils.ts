import { Request, Response } from 'express'
import WebhookPayload from '../models/WebhookPayload'
import pgClient from '../db/postgres/pgClient'
import { v4 as uuidv4 } from 'uuid'

export const deleteMongoDoc = async (record: Payload) => {
  const docId = record.mongo_doc_id
  const result = await WebhookPayload.deleteOne({ _id: docId })
  console.log("DELETE MONGO DOC RESULT", result)
  return result
}

export const getBinRecords = async (bin: Bin) => {
  const query = 'SELECT * FROM records WHERE bin_id = $1'
  const result = await pgClient.query(query, [bin.id])
  const records = result.rows
  return records
}

type Bin = {
  id: string,
  session_id: string,
  created_at: Date
}

type Payload = {
  id: string;
  [key: string]: any;
}

type Record = {
  id: number
  method: string
  bin_id: string
  created_at: Date
  mongo_doc_id: string | null
}

type RecordWithDoc = {
  id: number;
  method: string;
  bin_id: string;
  created_at: Date;
  payload: Payload;
}

export const addMongoDoc = async (record: Record): Promise<RecordWithDoc> => {
  const { id, method, bin_id, created_at } = record

  const doc = await WebhookPayload.findOne({ _id: record.mongo_doc_id })
  if (doc === null) throw new Error('addMongoDoc - doc is null')

  const docJson = doc.toJSON() as Payload
  return { id, method, bin_id, created_at, payload: docJson }
}
