import type { Response } from 'express'
import WebhookPayload from '../models/WebhookPayload'
import pgClient from '../db/postgres/pgClient'
import { WebhookDoc, RecordWithDoc, BinInterface, Record } from '../utils/types'
import { v4 as uuidv4 } from 'uuid'

const MS_IN_HOUR = 60 * 60 * 1000
const MS_IN_DAY = MS_IN_HOUR * 24
const MS_IN_WEEK = MS_IN_DAY * 7
const MS_IN_MONTH = MS_IN_DAY * 30

export const setSessionIdCookie = (res: Response) => {
  const session_id = uuidv4()
  res.set('Set-Cookie',
    `session_id=${session_id} max-age=${MS_IN_MONTH} httpOnly=true`)
  return session_id
}

export const getBinRecords = async (bin: BinInterface) => {
  const query = 'SELECT * FROM records WHERE bin_id = $1'
  const values = [bin.id]
  const result = await pgClient.query(query, [bin.id])
  console.log(query, '- VALUES:', values)
  const records = result.rows
  return records
}

export const deleteMongoDoc = async (record: Record) => {
  const docId = record.mongo_doc_id
  const result = await WebhookPayload.deleteOne({ _id: docId })
  console.log("-- DELETED MONGO DOC ID NUM:", docId, "-- RESULT:", result)
  return result
}

export const addMongoDoc = async (record: Record): Promise<RecordWithDoc> => {
  const { id, method, bin_id, created_at } = record

  const doc = await WebhookPayload.findOne({ _id: record.mongo_doc_id })
  if (doc === null) {
    const errMsg = "addMongoDoc - doc is null.\n" +
      "Record id: " + record.id + "\n" +
      "Record method: " + record.method + "\n" +
      "Record bin: " + record.bin_id + "\n" +
      "Record mongo_doc_id: " + record.mongo_doc_id + "\n"
    throw new Error(errMsg)
  }
  const docJson = doc.toJSON() as WebhookDoc
  return {
    id,
    method,
    bin_id,
    created_at,
    mongo_doc_id: docJson.id,
    payload: docJson.payload,
    headers: docJson.headers
  }
}
