import WebhookPayload from '../models/WebhookPayload'
import pgClient from '../db/postgres/pgClient'
import { WebhookDoc, RecordWithDoc, BinInterface, Record } from '../utils/types'

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
